import { Box, Button, Grid, List, ListItem, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FullFilmentStatusEnum, SeniorityEnum, Skill, Position, VagaStatusEnum, Resource, ResourceListDTO } from "../../types";
import AddIcon from '@mui/icons-material/Add';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { SkillsToCard, SkillsToCardString } from "../shared/skills-to-cards";
import { useEffect, useState } from "react";
import { AddResourceToPosition, PositionToBeHired, getPositionsList, getResourceList } from "../api/resources";
import { PositionStatusEnumLabel, SeniorityEnumLabel } from "../../enumMapper";
import { toast } from "react-toastify";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


interface SelectedPosition {
    positionId: string;
    fullfilments: string[];
}


const Vagas = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<SelectedPosition | null>();
    const [openResources, setOpenResources] = useState<boolean>(false);
    const [openPosition, setOpenPositions] = useState<Position[]>([]);
    const [selectedResources, setSelectedResources] = useState<IResourcesSelected[] | null>(null);
    const [resources, setResources] = useState<ResourceListDTO[]>([]);

    const getData = async () => {
        setOpenPositions(await getPositionsList());
    }

    useEffect(() => {
        getData();
        getResourceData();
    }, []);

    const openDialog = (id: any, fullfilments: string[]) => {
        setSelectedId({ positionId: id, fullfilments });
        setOpen(true);
    }

    const getResourceData = async () => {
        setResources(await getResourceList());
    }

    useEffect(() => {
        getData();
    }, []);


    const handletoBeHired = async (positionId: string) => {
        const position = openPosition.find((_: Position) => _.id == positionId);
        if (position) {
            await PositionToBeHired(positionId, !position.toBeHired).then(() => {
                toast.success('Position Updated');
                getData();
            }).catch(() => {
                toast.error('Error! Try again');
            });;
        }
    }

    const Actions = (props: any) => {
        return (
            <div className="actions">
                <Button variant="contained" onClick={() => openDialog(props.positionId, props.fullfilments)}>
                    <AddIcon />
                    Fullfilment
                </Button>
                <Button variant={props.toBeHired ? "contained" : "outlined"} onClick={() => handletoBeHired(props.positionId)}>To be Hired</Button>
            </div>
        )
    }

    const close = () => {
        setOpen(false);
        setSelectedId(null);
    }

    const handleOpenResourcesDialog = (positionId: string, fullfilments: string[]) => {
        setOpenResources(true);
        setSelectedId({ positionId, fullfilments });
        const selectedResources = fullfilments.map((_: string) => ({ name: resources.find((r: ResourceListDTO) => r.id == _)?.fullName ?? '' })) ?? [];

        setSelectedResources(selectedResources);
    }

    return (
        <>
            <Grid container className="container">
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader className='table-default'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Project</TableCell>
                                    <TableCell>Seniority</TableCell>
                                    <TableCell>Skills</TableCell>
                                    <TableCell>To Be Hired</TableCell>
                                    <TableCell>Resources</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {openPosition?.map((_: Position) => (
                                    <TableRow>
                                        <TableCell><Actions positionId={_.id} fullfilments={_.fullfilments} toBeHired={_.toBeHired} /></TableCell>
                                        <TableCell>{PositionStatusEnumLabel[_.status]}</TableCell>
                                        <TableCell>{_.title}</TableCell>
                                        <TableCell>{_.projectId}</TableCell>
                                        <TableCell>{SeniorityEnumLabel[_.seniority]}</TableCell>
                                        <TableCell><SkillsToCardString skills={_.skills} /></TableCell>
                                        <TableCell>{_.toBeHired ? 'Yes' : '-'}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined"
                                                onClick={() => handleOpenResourcesDialog(_.id, _.fullfilments)}>
                                                {_.fullfilments?.length || 0}
                                                <AssignmentIndIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {selectedId && (
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Box sx={style}>
                        <Typography variant="h6">
                            Add Resource
                        </Typography>
                        <Vagas.AddResources selected={selectedId} close={close} refetch={getData} resources={resources} />
                    </Box>
                </Modal>
            )}
            {selectedResources && (
                <Modal
                    open={openResources}
                    onClose={() => setOpenResources(false)}
                >
                    <Box sx={style}>
                        <Typography variant="h6">
                            Resources
                        </Typography>
                        <Vagas.Resources selecteds={selectedResources} />
                    </Box>
                </Modal>
            )}

        </>
    )
}

interface IAddResources {
    selected: SelectedPosition;
    resources: ResourceListDTO[];
    close: () => void;
    refetch: () => void;
}

Vagas.AddResources = ({ selected, resources, close, refetch }: IAddResources) => {
    const [selecteds, setSelected] = useState<string[]>(selected.fullfilments ?? []);
    const [filteredList, setFilteredList] = useState<ResourceListDTO[]>(resources);


    const handleSelected = (id: string) => {
        const exists = selecteds?.find(_ => _ === id);
        if (!exists) {
            setSelected([...selecteds, id]);
        } else {
            const newList = selecteds.filter((_: string) => _ !== id);
            setSelected(newList);
        }
    }

    const handleAdd = async () => {
        await AddResourceToPosition(selected.positionId, selecteds).then(() => {
            toast.success('Position Updated');
            close();
            refetch();
        }).catch(() => {
            toast.error('Error! Try again');
        });
    }

    const handleFilter = (value: string) => {
        const filteredList = resources.filter(e => e.fullName.toLowerCase().indexOf(value.toLowerCase()) != -1);
        setFilteredList(filteredList);
    }

    return (
        <>
            <TextField type="text" size="small" variant="outlined" placeholder="Search" onChange={(event: any) => handleFilter(event.target.value)} />
            <hr />
            <List className="dialog-resource-wrapper">
                {filteredList?.map((_: ResourceListDTO) => (
                    <ListItem className={selecteds?.find(e => e === _.id) ? "dialog-resource-card active" : "dialog-resource-card"} onClick={() => handleSelected(_.id)}>
                        {`${_.fullName}`}
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" style={{ marginRight: '10px' }} onClick={handleAdd}>Add</Button>
        </>
    )
}

interface IResourcesSelected {
    name: string;
}

interface IResources {
    selecteds: IResourcesSelected[];

}
Vagas.Resources = ({ selecteds }: IResources) => {

    return (
        <>
            <Table className="resources-fullfillment">
                <TableBody>
                    {selecteds?.map((_: IResourcesSelected) => (
                        <TableRow>
                            <TableCell>
                                {_.name}
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </>
    )
}

export { Vagas };
import { Box, Button, Grid, MenuItem, Modal, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { Resource, ResourceAddProject, ResourceProject, ResourceUpdateInfo } from "../../types";
import './resource-data.scss';
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import { updateResourceAddProject, getProjectList, updateResourceInfo, updateResourceComment, updateAddVacation, removeVacation, removeProject, setCurrentProject } from "../api/resources";
import { toast } from "react-toastify";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface IProps {
    resource: Resource;
    refetch: () => void;
}

const ResourceData = ({ resource, refetch }: IProps) => {
    const [tab, setTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {

        setTab(newValue);
    };


    return (
        <>
            <ResourceData.Menu tab={tab} handleChange={handleChange} />

            {tab === 0 && (<ResourceData.Home resource={resource} />)}
            {tab === 1 && (<ResourceData.Project resource={resource} refetch={refetch} />)}
            {tab === 2 && (<ResourceData.Vacation resource={resource} refetch={refetch} />)}
            {tab === 3 && (<ResourceData.Comments resource={resource} refetch={refetch}/>)}
        </>

    )
};

interface IHomeProps {
    resource: Resource;
}

ResourceData.Home = ({ resource }: IHomeProps) => {
    const [form, setForm] = useState<ResourceUpdateInfo>({
        name: resource.name,
        lastName: resource.lastName,
        gender: resource.gender,
        techLead: resource.techLead,
        status: resource.status.status,
        englishLevel: resource.englishLevel,
        salary: resource.salary
    });

    const handleChange = (field: any, value: any) => {
        if (form) {
            let copy = form;
            copy[field] = value as any;
            setForm(copy);
        }
    }

    const save = async () => {
        const input = {
            ...form,
            techLead: form.techLead === "Yes"
        }
        await updateResourceInfo(resource.id, input).then(() => {
            toast.success("Resource updated!");
        });
    }

    return (
        <>
            <Grid container className="resource-data">
                <Grid item xs={4}>
                    <TextField fullWidth label="Name" variant="standard" defaultValue={form.name} margin="dense" onChange={(e) => handleChange("name", e.target.value)} />
                    <TextField select fullWidth label="Gender" variant="standard" defaultValue={form.gender} margin="dense" onChange={(e) => handleChange("gender", e.target.value)} >
                        <MenuItem key={"Male"} value={0}>
                            Male
                        </MenuItem>
                        <MenuItem key={"Female"} value={1}>
                            Female
                        </MenuItem>
                        <MenuItem key={"Other"} value={2}>
                            Other
                        </MenuItem>
                    </TextField>
                    <TextField select fullWidth label="Tech lead" variant="standard" defaultValue={form.techLead ? "Yes" : "No"} margin="dense" onChange={(e) => handleChange("techLead", e.target.value)}>
                        <MenuItem key={"Yes"} value={"Yes"}>
                            Yes
                        </MenuItem>
                        <MenuItem key={"No"} value={"No"}>
                            No
                        </MenuItem>
                    </TextField>
                    <TextField fullWidth label="Salary" variant="standard" defaultValue={form.salary} margin="dense" onChange={(e) => handleChange("salary", e.target.value)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth label="Last Name" variant="standard" defaultValue={form.lastName} margin="dense" onChange={(e) => handleChange("lastName", e.target.value)} />
                    <TextField select fullWidth label="Status" variant="standard" defaultValue={form.status} margin="dense" onChange={(e) => handleChange("status", e.target.value)}>
                        <MenuItem key={"NBL"} value={0}>
                            NBL
                        </MenuItem>
                        <MenuItem key={"RR_PLAN"} value={1}>
                            RR_PLAN
                        </MenuItem>
                        <MenuItem key={"RT_PLAN"} value={2}>
                            RT_PLAN
                        </MenuItem>
                    </TextField>
                    <TextField select fullWidth label="English Level" variant="standard" defaultValue={form.englishLevel} margin="dense" onChange={(e) => handleChange("englishLevel", e.target.value)}>
                        <MenuItem key={"Basic"} value={0}>
                            Basic
                        </MenuItem>
                        <MenuItem key={"Intermediate"} value={1}>
                            Intermediate
                        </MenuItem>
                        <MenuItem key={"Advanced"} value={2}>
                            Advanced
                        </MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Grid container>
                <Button variant="contained" onClick={save}>
                    Save
                </Button>
            </Grid>
        </>
    )
}


interface IProjectProps {
    resource: Resource;
    refetch: () => void;
}

ResourceData.Project = ({ resource, refetch }: IProjectProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, setdata] = useState<any[]>([]);
    const [form, setForm] = useState<ResourceAddProject>({});

    const getData = async () => {
        setdata(await getProjectList());
    }

    useEffect(() => {
        getData();
    }, [])

    const handleChange = (field: any, value: any) => {
        if (form) {
            let copy = form;
            copy[field] = value as any;
            setForm(copy);
        }
    }

    const save = async () => {
        if (!form.project) {
            toast.error('Project cannot be empty');
            return;
        }
        if (!form.beginDate) {
            toast.error('Begin date cannot be empty');
            return;
        }

        if (form)
            await updateResourceAddProject(resource.id, form).then(() => {
                toast.success('Project Added!');
                setOpen(false);
                refetch();
            });
    }

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

    const remove = async (index: number) => {
        await removeProject(resource.id, index).then(() => {
            toast.success('Project removed');
            refetch();
        })
    }

    const handleProjectChange = async (projectId: string) => {
        await setCurrentProject(resource.id, projectId).then(() => {
            toast.success('Curent project updated');
            refetch();
        });
    }

    return (
        <>
            <Grid container className="resource-data">
                <Grid container alignItems={'center'}>
                    <Grid item xs={8}>
                        <Button variant="contained" onClick={() => setOpen(true)}>
                            <AddIcon />
                            Add a new Project
                        </Button>
                    </Grid>
                    {resource.project && (
                        <Grid item xs={4} alignItems={'flex-end'} style={{ textAlign: "center", padding: "10px", border: "1px solid #ebebeb", borderRadius: "5px" }}>
                            <h3 style={{ margin: "0 0 5px" }}>Current Project</h3>
                            <div><strong>Project: </strong>{resource.project?.project.name}</div>
                        </Grid>
                    )}

                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader className='table-default'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project</TableCell>
                                    <TableCell>Current Project</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {resource?.projectHistory?.map((row: ResourceProject, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.project.name}</TableCell>
                                        <TableCell>{resource.project?.project.id === row.project.id ? 'Yes' : '-'}</TableCell>
                                        <TableCell>{moment(row?.beginDate).format('MM-DD-YYYY')}</TableCell>
                                        <TableCell>{moment(row?.endDate).format('MM-DD-YYYY')}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => setOpen(true)}>
                                                <EditIcon />
                                                Edit
                                            </Button>
                                            <Button variant="contained" onClick={() => remove(index)} style={{ marginLeft: "10px" }}>
                                                <DeleteForeverIcon />
                                                Remove
                                            </Button>
                                            <Button variant="contained" disabled={resource.project?.project.id === row.project.id} onClick={() => handleProjectChange(row.project.id)} style={{ marginLeft: "10px" }}>
                                                <SwapHorizIcon />
                                                Set as Current Project
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>
                        Add new Project
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur
                    </Typography>
                    <TextField select fullWidth label="Project" variant="standard" margin="dense" onChange={(e) => handleChange("project", e.target.value)}>
                        {data.map((_) => (
                            <MenuItem key={_.name} value={_}>
                                {_.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField fullWidth label="Start Date" variant="standard" margin="dense" type="date" onChange={(e) => handleChange("beginDate", e.target.value)} />
                    <TextField fullWidth label="End Date" variant="standard" margin="dense" type="date" onChange={(e) => handleChange("endDate", e.target.value)} />
                    <Button variant="contained" onClick={save}>Save</Button>
                </Box>
            </Modal>
        </>
    )
}


interface IVacationProps {
    resource: Resource;
    refetch: () => void;
}

interface IVacationForm {
    begin?: Date;
    end?: Date;
}

ResourceData.Vacation = ({ resource, refetch }: IVacationProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [form, setForm] = useState<IVacationForm>({})

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

    const handleChange = (field: any, value: any) => {
        if (form) {
            let copy = form;
            copy[field] = value as any;
            setForm(copy);
        }
    }

    const save = async () => {
        await updateAddVacation(resource.id, form).then(() => {
            toast.success('Vacation added');
            setOpen(false);
            setForm({});
            refetch();
        })
    }

    const remove = async (index: number) => {
        await removeVacation(resource.id, index).then(() => {
            toast.success('Vacation removed');
            setOpen(false);
            setForm({});
            refetch();
        })
    }

    return (
        <>
            <Grid container className="resource-data">
                <Grid item xs={12}>
                    Available Vacation days: {resource.vacationAvailableDays}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        <AddIcon />
                        Add a new vacation
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader className='table-default'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resource.vacationHistory?.map((row: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{moment(row?.begin).format('MM-DD-YYYY')}</TableCell>
                                        <TableCell>{moment(row?.end).format('MM-DD-YYYY')}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={() => setOpen(true)}>
                                                <EditIcon />
                                                Edit
                                            </Button>
                                            <Button variant="contained" onClick={() => remove(index)} style={{ marginLeft: "10px" }}>
                                                <DeleteForeverIcon />
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid >
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>
                        Add Vacation
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                        blanditiis tenetur
                    </Typography>
                    <TextField fullWidth label="Start Date" variant="standard" margin="dense" type="date" onChange={(e: any) => handleChange("begin", e.target.value)} />
                    <TextField fullWidth label="End Date" variant="standard" margin="dense" type="date" onChange={(e: any) => handleChange("end", e.target.value)} />
                    <Button variant="contained" onClick={save}>Save</Button>
                </Box>
            </Modal>
        </>
    )
}

interface IComments {
    resource: Resource;
    refetch: () => void;
}

ResourceData.Comments = ({ resource, refetch }: IComments) => {
    const [comment, setComment] = useState<string>(resource?.profileComments || "");

    const save = async () => {
        await updateResourceComment(resource.id, comment).then(() => {
            toast.success('Profile comment updated');
            refetch();
        })
    }

    return (
        <>
            <TextField
                id="standard-multiline-static"
                label="Comments"
                multiline
                fullWidth
                rows={4}
                defaultValue={comment}
                variant="standard"
                onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="contained" style={{ marginTop: '10px' }} onClick={save}>
                Save
            </Button >
        </>
    )
}

interface IMenuProps {
    tab: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

ResourceData.Menu = ({ tab, handleChange }: IMenuProps) => {
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Info" tabIndex={0} />
                    <Tab label="Project" tabIndex={1} />
                    <Tab label="Vacation" tabIndex={2} />
                    <Tab label="Comments" tabIndex={3} />
                </Tabs>
            </Box>
        </>
    )
}



export { ResourceData }
import moment from 'moment';
import { BsonId, EnglishLevelEnum, FullFilmentsDTO, GenderEnum, Position, Project, Resource, ResourceListDTO, ResourceProject, ResourceStatusEnum, ResourceType, SeniorityEnum, Skill, Supervisor } from '../../types';
import { Card } from '../shared/card';
import './resourceTable.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { SkillsToCard } from '../shared/skills-to-cards';
import { getPositionsList, getResourceList, getSkillsList } from '../api/resources';
import ChatIcon from '@mui/icons-material/Chat';
import { EnglishLevelEnumLabel, FullFilmentStatusEnumLabel, ResourceStatusEnumLabel, SeniorityEnumLabel } from '../../enumMapper';



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



const Candidates = () => {
    const [openFullfillments, setFullfillments] = useState<boolean>(false);
    const [openComments, setComments] = useState<string>('');
    const [showComments, setShowComments] = useState<boolean>(false);
    const [fullfillmentsContent, setFullfillmentsContent] = useState<FullFilmentsDTO[] | null>(null);
    const [data, setData] = useState<ResourceListDTO[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [filteredResources, setFilteredResources] = useState<ResourceListDTO[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [filterSeniority, setFilterSeniority] = useState<SeniorityEnum>(SeniorityEnum.none);
    const [filterSkills, setFilterSkills] = useState<string>('');

    const Actions = (id: BsonId) => {
        return (
            <div className="actions">
                <Link to={`/resource/${id.id}`}>
                    <Button variant="contained">
                        <EditIcon />
                        Edit
                    </Button>
                </Link>
            </div>
        )
    }

    const getData = async () => {
        setSkills(await getSkillsList())
        const resources = await getResourceList();
        setData(resources);
        setFilteredResources(resources)
        setPositions(await getPositionsList());
    }

    useEffect(() => {
        getData();
    }, []);

    const openFullfilment = (resourcePositions: string[]) => {
        setFullfillments(true);
        setFullfillmentsContent(resourcePositions.map((pos) => {
            const position = positions?.find(_ => _.id == pos);
            return {
                name: position?.title ?? '-'
            }
        }));
    }



    const seniority = [
        { label: "None", seniority: SeniorityEnum.none },
        { label: SeniorityEnumLabel[SeniorityEnum.Intern], seniority: SeniorityEnum.Intern },
        { label: SeniorityEnumLabel[SeniorityEnum.JuniorBeginner], seniority: SeniorityEnum.JuniorBeginner },
        { label: SeniorityEnumLabel[SeniorityEnum.JuniorMid], seniority: SeniorityEnum.JuniorMid },
        { label: SeniorityEnumLabel[SeniorityEnum.JuniorTop], seniority: SeniorityEnum.JuniorTop },
        { label: SeniorityEnumLabel[SeniorityEnum.MidBeginner], seniority: SeniorityEnum.MidBeginner },
        { label: SeniorityEnumLabel[SeniorityEnum.MidMid], seniority: SeniorityEnum.MidMid },
        { label: SeniorityEnumLabel[SeniorityEnum.MidTop], seniority: SeniorityEnum.MidTop },
        { label: SeniorityEnumLabel[SeniorityEnum.Senior], seniority: SeniorityEnum.Senior },
        { label: SeniorityEnumLabel[SeniorityEnum.SeniorTop], seniority: SeniorityEnum.SeniorTop },
    ];

    const filterByText = (value: string) => setFilterText(value);
    const filterBySeniority = (value: SeniorityEnum) => setFilterSeniority(value);
    const filterBySkill = (value: string) => setFilterSkills(value);


    useEffect(() => {
        filter();
    }, [filterText, filterSeniority, filterSkills])


    const filter = () => {
        // filterText && filterSeniority
        console.log('filters', filterText, filterSeniority, filterSkills)
        let rawData = data;
        if (filterText)
            rawData = rawData?.filter((_) => _.fullName.toLowerCase().indexOf(filterText.toLowerCase()) != -1);

        if (filterSeniority !== SeniorityEnum.none) {
            rawData = rawData.filter((_) => _.seniority === filterSeniority);
        }

        if (filterSkills)
            rawData = rawData.filter((_) => _.skills.find((s) => s.name.toLowerCase() === filterSkills.toLowerCase()) != null);

        console.log(rawData);
        setFilteredResources(rawData);
    }

    const clearFilter = () => {
        setFilterText('');
        setFilterSeniority(SeniorityEnum.none);
        setFilterSkills('');
    }

    return (
        <>
            <Card>
                <>
                    <div className='filtros'>
                        <TextField id="outlined-basic" label="Filtro" variant="outlined" onKeyUp={(e) => filterByText(e.target.value)} />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterSeniority}
                            label="Seniority"
                            onChange={(e) => filterBySeniority(e.target.value as SeniorityEnum)}
                        >
                            {seniority.map((_: any) => {
                                return (
                                    <MenuItem value={_.seniority}>{_.label}</MenuItem>
                                );
                            })}
                        </Select>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Profile"
                            value={filterSkills}
                            onChange={(e) => filterBySkill(e.target.value)}
                            style={{ width: '150px' }}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            {skills?.map((_) => (
                                <MenuItem value={_.name}>{_.name}</MenuItem>
                            ))}
                        </Select>
                        <Button variant="outlined" onClick={clearFilter}>Clear</Button>
                    </div>
                    {/* <CompactTable columns={columns} data={{ nodes }} /> */}
                    <TableContainer component={Paper}>
                        <Table stickyHeader className='table-default'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Actions</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Current Project</TableCell>
                                    <TableCell>Fullfilments</TableCell>
                                    <TableCell>Date Available</TableCell>
                                    <TableCell>Seniority</TableCell>
                                    <TableCell>TL</TableCell>
                                    <TableCell>English Level</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Skills</TableCell>
                                    <TableCell>Pr Comments</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredResources?.map((row: ResourceListDTO) => {
                                    return (
                                        <TableRow key={row.fullName}>
                                            <TableCell><Actions id={row.id} /></TableCell>
                                            <TableCell>{row.fullName} </TableCell>
                                            <TableCell>{row.projectName ? row.projectName : '-'}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={() => openFullfilment(row.fullfilments)}>
                                                    {row.fullfilments?.length ?? 0}
                                                    <FolderOpenIcon />
                                                </Button>
                                            </TableCell>
                                            <TableCell>{row.dateAvailable ? moment(row.dateAvailable).format('MM-DD-YYYY') : '-'}</TableCell>
                                            <TableCell>{SeniorityEnumLabel[row.seniority]}</TableCell>
                                            <TableCell>{row.techLead ? 'Yes' : '-'}</TableCell>
                                            <TableCell>{EnglishLevelEnumLabel[row.englishLevel]}</TableCell>
                                            <TableCell>{ResourceStatusEnumLabel[row.status]}</TableCell>
                                            <TableCell>{<SkillsToCard skills={row.skills} />}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={() => {
                                                    setComments(row.comments);
                                                    setShowComments(true);
                                                }}>
                                                    <ChatIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            </Card >
            <Modal
                open={openFullfillments}
                onClose={() => setFullfillments(false)}
            >
                <Box sx={style}>
                    <Typography variant="h6">
                        Fullfilments
                    </Typography>
                    <Table>
                        <TableBody>
                            {fullfillmentsContent?.map((content: FullFilmentsDTO) => (<TableRow>
                                <TableCell>
                                    {content.name}
                                </TableCell>
                            </TableRow>)
                            )}

                        </TableBody>
                    </Table>
                </Box>
            </Modal>
            <Modal
                open={showComments}
                onClose={() => setShowComments(false)}
            >
                <Box sx={style}>
                    <Typography variant="h6">
                        Profile Comments
                    </Typography>
                    <Typography variant="body1">
                        {openComments === '' ? 'No comments' : openComments}
                    </Typography>
                </Box>
            </Modal>
        </>

    )
}

export { Candidates }
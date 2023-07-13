import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import {useNavigate} from "react-router-dom";
import vacancyService from "../../services/vacancy-service";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const commonStyles = {
        fontSize: "14px",
        display: "inline-block",
        fontWeight: 1000,
        color:"#fff",
        width: '6rem',
        height: '1.5rem',
        borderColor:"#fff",
    };

    let navigate = useNavigate();

    const[idUser,setIdUser]=useState(0)

    useEffect(async() => {
        let user = await vacancyService.getUserId()
        setIdUser(user.data.data.id)
    }, [])

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        axios.get("api/list-userVacancy").
        then(res => {
            // console.log(res.data)
            setJobs(res.data.result)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // console.log(jobs);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable">
                    <Tab label="Applied" {...a11yProps(0)} />
                    <Tab label="Shortlisted" {...a11yProps(1)} />
                    <Tab label="Unsuitable" {...a11yProps(2)} />
                    <Tab label="Not Passed" {...a11yProps(3)} />
                    <Tab label="Rejected" {...a11yProps(4)} />
                    <Tab label="Hired" {...a11yProps(5)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {jobs.map((item, index) => {
                        if (item.user.id === idUser) {
                            if (item.appliedStatus === 1) {
                                return (
                                    <Card align="left" variant="outlined" sx={{minWidth: 275}}>
                                        <CardContent>
                                            <Box>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs>
                                                        <Grid item container direction="column" alignItems="flex-end"
                                                              xs>
                                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                <Box sx={{
                                                                    ...commonStyles,
                                                                    borderRadius: 1,
                                                                    backgroundColor: "#152347"
                                                                }}>
                                                                    <Typography align="center">
                                                                        Applied
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Typography
                                                            color="#454ADE"
                                                            sx={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {item.vacancy.title}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                            {item.vacancy.industry}
                                                        </Typography>
                                                        <br/>
                                                        <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                            <LocationOnIcon fontSize="inherit"/>
                                                            {' '}
                                                            {item.vacancy.workingLocation}
                                                            <br/>
                                                            <AttachMoneyIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`IDR ${item.vacancy.startSalary} - ${item.vacancy.endSalary}`}
                                                            <br/>
                                                            <WorkIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.yearsOfExperience} of experience`}
                                                            <br/>
                                                            <AccessAlarmIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.closingDate}`}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail-applied/" + idUser + "/" + item.vacancy.id);
                                                    }}> Detail
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        }
                    }
                )}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {jobs.map((item, index) => {
                        if (item.user.id === idUser) {
                            if (item.appliedStatus === 2) {
                                return (
                                    <Card align="left" variant="outlined" sx={{minWidth: 275}}>
                                        <CardContent>
                                            <Box>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs>
                                                        <Grid item container direction="column" alignItems="flex-end"
                                                              xs>
                                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                <Box sx={{
                                                                    ...commonStyles,
                                                                    borderRadius: 1,
                                                                    backgroundColor: "#EEC643"
                                                                }}>
                                                                    <Typography align="center">
                                                                        Shortlisted
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Typography
                                                            color="#454ADE"
                                                            sx={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {item.vacancy.title}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                            {item.vacancy.industry}
                                                        </Typography>
                                                        <br/>
                                                        <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                            <LocationOnIcon fontSize="inherit"/>
                                                            {' '}
                                                            {item.vacancy.workingLocation}
                                                            <br/>
                                                            <AttachMoneyIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`IDR ${item.vacancy.startSalary} - ${item.vacancy.endSalary}`}
                                                            <br/>
                                                            <WorkIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.yearsOfExperience} of experience`}
                                                            <br/>
                                                            <AccessAlarmIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.closingDate}`}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail-applied/" + idUser + "/" + item.vacancy.id);
                                                    }}> Detail
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        }
                    }
                )}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {jobs.map((item, index) => {
                        if (item.user.id === idUser) {
                            if (item.appliedStatus === 3) {
                                return (
                                    <Card align="left" variant="outlined" sx={{minWidth: 275}}>
                                        <CardContent>
                                            <Box>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs>
                                                        <Grid item container direction="column" alignItems="flex-end"
                                                              xs>
                                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                <Box sx={{
                                                                    ...commonStyles,
                                                                    borderRadius: 1,
                                                                    backgroundColor: "#65686B"
                                                                }}>
                                                                    <Typography align="center">
                                                                        Unsuitable
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Typography
                                                            color="#454ADE"
                                                            sx={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {item.vacancy.title}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                            {item.vacancy.industry}
                                                        </Typography>
                                                        <br/>
                                                        <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                            <LocationOnIcon fontSize="inherit"/>
                                                            {' '}
                                                            {item.vacancy.workingLocation}
                                                            <br/>
                                                            <AttachMoneyIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`IDR ${item.vacancy.startSalary} - ${item.vacancy.endSalary}`}
                                                            <br/>
                                                            <WorkIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.yearsOfExperience} of experience`}
                                                            <br/>
                                                            <AccessAlarmIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.closingDate}`}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail-applied/" + idUser + "/" + item.vacancy.id);
                                                    }}> Detail
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        }
                    }
                )}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {jobs.map((item, index) => {
                        if (item.user.id === idUser) {
                            if (item.appliedStatus === 4) {
                                return (
                                    <Card align="left" variant="outlined" sx={{minWidth: 275}}>
                                        <CardContent>
                                            <Box>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs>
                                                        <Grid item container direction="column" alignItems="flex-end"
                                                              xs>
                                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                <Box sx={{
                                                                    ...commonStyles,
                                                                    borderRadius: 1,
                                                                    backgroundColor: "#A0A4A8"
                                                                }}>
                                                                    <Typography align="center">
                                                                        Not Passed
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Typography
                                                            color="#454ADE"
                                                            sx={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {item.vacancy.title}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                            {item.vacancy.industry}
                                                        </Typography>
                                                        <br/>
                                                        <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                            <LocationOnIcon fontSize="inherit"/>
                                                            {' '}
                                                            {item.vacancy.workingLocation}
                                                            <br/>
                                                            <AttachMoneyIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`IDR ${item.vacancy.startSalary} - ${item.vacancy.endSalary}`}
                                                            <br/>
                                                            <WorkIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.yearsOfExperience} of experience`}
                                                            <br/>
                                                            <AccessAlarmIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.closingDate}`}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail-applied/" + idUser + "/" + item.vacancy.id);
                                                    }}> Detail
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        }
                    }
                )}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {jobs.map((item, index) => {
                        if (item.user.id === idUser) {
                            if (item.appliedStatus === 5) {
                                return (
                                    <Card align="left" variant="outlined" sx={{minWidth: 275}}>
                                        <CardContent>
                                            <Box>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs>
                                                        <Grid item container direction="column" alignItems="flex-end"
                                                              xs>
                                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                <Box sx={{
                                                                    ...commonStyles,
                                                                    borderRadius: 1,
                                                                    backgroundColor: "#E9322E"
                                                                }}>
                                                                    <Typography align="center">
                                                                        Rejected
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Typography
                                                            color="#454ADE"
                                                            sx={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {item.vacancy.title}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                            {item.vacancy.industry}
                                                        </Typography>
                                                        <br/>
                                                        <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                            <LocationOnIcon fontSize="inherit"/>
                                                            {' '}
                                                            {item.vacancy.workingLocation}
                                                            <br/>
                                                            <AttachMoneyIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`IDR ${item.vacancy.startSalary} - ${item.vacancy.endSalary}`}
                                                            <br/>
                                                            <WorkIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.yearsOfExperience} of experience`}
                                                            <br/>
                                                            <AccessAlarmIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.closingDate}`}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail-applied/" + idUser + "/" + item.vacancy.id);
                                                    }}> Detail
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        }
                    }
                )}
            </TabPanel>
            <TabPanel value={value} index={5}>
                {jobs.map((item, index) => {
                        if (item.user.id === idUser) {
                            if (item.appliedStatus === 6) {
                                return (
                                    <Card align="left" variant="outlined" sx={{minWidth: 275}}>
                                        <CardContent>
                                            <Box>
                                                <Grid container alignItems={"center"}>
                                                    <Grid item xs>
                                                        <Grid item container direction="column" alignItems="flex-end"
                                                              xs>
                                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                <Box sx={{
                                                                    ...commonStyles,
                                                                    borderRadius: 1,
                                                                    backgroundColor: "#0B6732"
                                                                }}>
                                                                    <Typography align="center">
                                                                        Hired
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Typography
                                                            color="#454ADE"
                                                            sx={{fontWeight: 'bold', fontSize: 24}}
                                                        >
                                                            {item.vacancy.title}
                                                        </Typography>
                                                        <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                            {item.vacancy.industry}
                                                        </Typography>
                                                        <br/>
                                                        <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                            <LocationOnIcon fontSize="inherit"/>
                                                            {' '}
                                                            {item.vacancy.workingLocation}
                                                            <br/>
                                                            <AttachMoneyIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`IDR ${item.vacancy.startSalary} - ${item.vacancy.endSalary}`}
                                                            <br/>
                                                            <WorkIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.yearsOfExperience} of experience`}
                                                            <br/>
                                                            <AccessAlarmIcon fontSize="inherit"/>
                                                            {' '}
                                                            {`${item.vacancy.closingDate}`}
                                                        </Typography>

                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail-applied/" + idUser + "/" + item.vacancy.id);
                                                    }}> Detail
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                )
                            }
                        }
                    }
                )}
            </TabPanel>
        </Box>
    );
}

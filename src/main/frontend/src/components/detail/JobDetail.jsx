import React, {useEffect, useState} from "react";
import { Box, Grid, Typography, Button, Card, CardContent, Container, CardActions, ThemeProvider } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate , useParams } from "react-router-dom";
import theme from "../../theme/Theme";
import HeaderDetailJob from "../header/HeaderDetailJob";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import vacancyService from "../../services/vacancy-service";
import axios from "axios";
import AuthService from "../../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Recommendation from "../list/RecommendationList";

function JobDetail(props) {
    const[job, setJob]=useState([])
    const[title, setTitle]=useState('')
    const[userVacancy, setUserVacancy]=useState([])
    let navigate = useNavigate();
    let { idVacancy } = useParams();
    let { idUser } = useParams();

    // console.log(idVacancy)
    // console.log(idUser)

    useEffect(() => {
        axios.get("/api/vacancy/" + idVacancy).
        then(res => {
            // console.log(res.data)
            setJob(res.data)
            setTitle(res.data.title)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get("/api/userVacancyByUserByVacancy/" + idUser + "/" + idVacancy).
        then(res => {
            // console.log(res.data)
            setUserVacancy(res.data.result)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // console.log(userVacancy)
    const userVacancyLength = userVacancy.length
    const jobStatus = job.status

    const handleClick=(e)=> {
        e.preventDefault()
        vacancyService.createAppliedJob(idUser, idVacancy)
        navigate("/application-success/" + title)
    }

    const role = AuthService.getCurrentRole();

    if (role === "KANDIDAT" || role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderDetailJob> </HeaderDetailJob>
                    <br/>
                    <Container fixed>
                        <Card align="left" variant="outlined">
                            <CardContent>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIosNewIcon/>}
                                    onClick={() => {
                                        navigate("/job-list");
                                    }}>
                                    Back
                                </Button>

                                <br/>
                                <br/>
                                <Box>
                                    <Grid container alignItems={"center"}>
                                        <Grid item xs>
                                            <Typography
                                                color="#454ADE"
                                                sx={{fontWeight: 'bold', fontSize: 24}}
                                            >
                                                {job.title}
                                            </Typography>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                {job.industry}
                                            </Typography>
                                            <br/>
                                            <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                <Box sx={{display:'flex', mb:1}}>
                                                    <Box sx={{display:'flex', alignItems:'center', mr:1}}>
                                                        <LocationOnIcon fontSize="inherit"/> {' '} <Typography sx={{ml:1}}>Working Location:</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography>
                                                            {job.workingLocation}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{display:'flex', mb:1}}>
                                                    <Box sx={{display:'flex', alignItems:'center', mr:1}}>
                                                        <AttachMoneyIcon fontSize="inherit"/> <Typography sx={{ml:1}}>Range Salary:</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography>
                                                            {`IDR ${job.startSalary} - ${job.endSalary}`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{display:'flex', mb:1}}>
                                                    <Box sx={{display:'flex', alignItems:'center', mr:1}}>
                                                        <WorkIcon fontSize="inherit"/>
                                                    </Box>
                                                    <Box>
                                                        <Typography>
                                                            {`${job.yearsOfExperience} of experience`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{display:'flex', mb:1}}>
                                                    <Box sx={{display:'flex', alignItems:'center', mr:1}}>
                                                        <AccessAlarmIcon fontSize="inherit"/>
                                                    </Box>
                                                    <Box>
                                                        {`Closed on: ${job.closingDate}`}
                                                    </Box>
                                                </Box>
                                            </Typography>
                                            <br/>
                                            <Typography
                                                color="#454ADE"
                                                sx={{fontWeight: 'bold', fontSize: 24}}
                                            >
                                                Job Description
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {job.keyResponsibility}
                                            </Typography>
                                            <br/>
                                            <Typography
                                                color="#454ADE"
                                                sx={{fontWeight: 'bold', fontSize: 24}}
                                            >
                                                Requirements
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {job.behaviouralCompetencies}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>

                            {role === 'KANDIDAT' ? (
                                userVacancyLength === 0 ? (
                                jobStatus === 1 ? (
                                    <CardActions>
                                        <Grid item container direction="column" alignItems="flex-end" xs>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button variant="contained" onClick={handleClick}>Apply for
                                                        Job</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>

                                    </CardActions>
                                ) : (
                                    <CardActions>
                                        <Grid item container direction="column" alignItems="flex-end" xs>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button variant="contained" disabled>
                                                        Closed
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                )
                            ) : (
                                <CardActions>
                                    <Grid item container direction="column" alignItems="flex-end" xs>
                                        <Grid item mt={2}>
                                            <Box>
                                                <Button variant="contained" disabled>
                                                    Applied
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            )) : (
                                <br/>
                                )}
                        </Card>
                        <br/>
                    </Container>
                </Box> <br></br><br></br>
                <Container>
                    <Recommendation props={idVacancy}></Recommendation>
                </Container>
            </ThemeProvider>
        );
    } else {
        return(
            <ThemeProvider theme={theme}>
                <Box>
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="center" item xs={10}>
                                <br />
                                <br />
                                <RemoveCircleOutlineIcon color="error" sx={{ fontSize: 300}} />
                                <Typography  variant="h2">
                                    <br />
                                    You don't have access to this page
                                </Typography>
                                <br />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }
};

export default JobDetail;
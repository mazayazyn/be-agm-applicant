import React, {useEffect, useState} from "react";
import { Box, Grid, Typography, Button, Card, CardContent, Container, CardActions, ThemeProvider } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate , useParams } from "react-router-dom";
import theme from "../../theme/Theme";
import HeaderJob from "../header/HeaderJob";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import AuthService from "../../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function JobDetailApplied(props) {
    const[job, setJob]=useState([])
    const[userVacancy, setUserVacancy]=useState([])

    let navigate = useNavigate();
    let { idVacancy } = useParams();
    let { idUser } = useParams();

    useEffect(() => {
        axios.get("/api/vacancy/" + idVacancy).
        then(res => {
            // console.log(res.data)
            setJob(res.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get("/api/userVacancyByUserByVacancy/" + idUser + "/" + idVacancy).
        then(res => {
            // console.log(res.data.result)
            setUserVacancy(res.data.result)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const role = AuthService.getCurrentRole();

    if (role === "KANDIDAT") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderJob> </HeaderJob>
                    <br/>
                    <Container fixed>
                        <Card align="left" variant="outlined">
                            <CardContent>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIosNewIcon/>}
                                    onClick={() => {
                                        navigate("/status-applicant");
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
                                                <LocationOnIcon fontSize="inherit"/>
                                                {' '}
                                                {job.workingLocation}
                                                <br/>
                                                <AttachMoneyIcon fontSize="inherit"/>
                                                {' '}
                                                {`IDR ${job.startSalary} - ${job.endSalary}`}
                                                <br/>
                                                <WorkIcon fontSize="inherit"/>
                                                {' '}
                                                {`${job.yearsOfExperience} of experience`}
                                                <br/>
                                                <AccessAlarmIcon fontSize="inherit"/>
                                                {' '}
                                                {`Closed on: ${job.closingDate}`}
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
                        </Card>
                        <br/>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    } else{
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

export default JobDetailApplied;
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
import vacancyService from "../../services/vacancy-service";
import axios from "axios";
import AuthService from "../../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

function CandidateDetail(props) {
    const[candidate, setCandidate]=useState([])
    let { idCandidate } = useParams();
    const role = AuthService.getCurrentRole();
    // console.log(idVacancy)
    // console.log(idUser)

    useEffect(() => {
        axios.get("/api/profile/getById/" + idCandidate).
        then(res => {
            // console.log(res.data)
            setCandidate(res.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])




    if ( role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <br/>
                    <Container fixed>
                        <Card align="left" variant="outlined">
                            <CardContent>

                                <br/>
                                <br/>
                                <Box>
                                    <Grid container alignItems={"center"}>
                                        <Grid item xs>
                                            <Typography
                                                color="#454ADE"
                                                sx={{fontWeight: 'bold', fontSize: 24}}
                                            >
                                                {candidate.fullName}
                                            </Typography>
                                            <Typography sx={{fontWeight: 'bold', fontSize: 16}}>
                                                {candidate.industry}
                                            </Typography>
                                            <br/>
                                            <Typography variant="inherit" sx={{lineHeight: 2}}>
                                                <LocationOnIcon fontSize="inherit"/>
                                                {' '}
                                                {candidate.jobLevel}
                                                <br/>
                                                <BusinessIcon fontSize="inherit" />
                                                {' '}
                                                {candidate.jobPosition}
                                                <br/>
                                                <BusinessCenterIcon fontSize="inherit" />
                                                {' '}
                                                {candidate.jobLevel}
                                                <br/>
                                                <AttachMoneyIcon fontSize="inherit" />
                                                {' '}
                                                {`IDR ${candidate.currentSalary}`}
                                                <br />
                                                <WorkHistoryIcon fontSize="inherit" />
                                                {' '}
                                                {`${candidate.yearExperience} years of experience`}
                                                <br />
                                            </Typography>
                                            <br/>

                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                        <br/>
                    </Container>
                </Box>
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

export default CandidateDetail;
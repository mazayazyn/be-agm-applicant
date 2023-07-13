import React, {useEffect, useState} from "react";
import { Box, Grid, Typography, Button, Card, CardContent, Container, CardActions, ThemeProvider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";;
import { useParams } from "react-router-dom";
import theme from "../../theme/Theme";
import axios from "axios";
import AuthService from "../../services/auth.service";
import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import uploadService from "../../services/upload-service";

function CandidateHiredDetail(props) {
    const[candidate, setCandidate]=useState([])
    let { idCandidate } = useParams();

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

    return (
        <ThemeProvider theme={theme}>
            <p><br></br></p>
            <Box>
                <br/>
                <Container fixed>
                    <Card variant="outlined">
                        <CardContent>
                            <p></p>
                            <Typography variant="h4" component="div" align="center">
                                <b >Profile</b>
                                <Typography
                                    color="#454ADE"
                                    sx={{ fontWeight: 'bold', fontSize: 24 }}
                                >
                                    {candidate.fullName}
                                </Typography>
                            </Typography>
                            <Grid class="form-group col-md-6" align="center">
                                <Typography sx={{ fontSize: 20 }} >
                                    <Typography variant = "h8">{candidate.email}</Typography>
                                    <p></p>
                                </Typography>
                            </Grid>

                            <Box>
                                <Grid container alignItems={"center"}>
                                    <Grid item xs>
                                        <Grid item container direction="column" alignItems="flex-end" xs>
                                        </Grid>

                                        <Typography variant="inherit" sx={{lineHeight: 2}}>

                                            <Typography><AccountCircleIcon fontSize="inherit" /> <b> General Overview: </b>{candidate.about}</Typography>
                                            <br/>
                                            <Typography><CallIcon fontSize="inherit" /> <b> Contact Number: </b>{candidate.noTelp}</Typography>
                                            <br/>
                                            <Typography><CalendarTodayIcon fontSize="inherit" /> <b> Date of Birth: </b>{candidate.dateOfBirth}</Typography>
                                            <br/>
                                            <Typography><WorkHistoryIcon fontSize="inherit" /> <b> Years of Experience: </b>{candidate.yearExperience} years of experience</Typography>
                                            <br/>
                                            <Typography><AttachMoneyIcon fontSize="inherit" /> <b> Current Salary: </b>IDR{candidate.currentSalary}</Typography>
                                            <br/>
                                            <Typography><BusinessCenterIcon fontSize="inherit" /> <b> Industry: </b>{candidate.industry}</Typography>
                                            <br/>
                                            <Typography><BusinessCenterIcon fontSize="inherit" /> <b> Job Level: </b>{candidate.jobLevel}</Typography>
                                            <br/>
                                            <Typography><BusinessIcon fontSize="inherit" /> <b> Job Position: </b>{candidate.jobPosition}</Typography>
                                            <br/>
                                        </Typography>
                                        <br/>

                                        <CardActions>
                                            <Grid item container direction="column" alignItems="flex-end" xs>
                                            </Grid>
                                            <Grid item mt={2}>
                                                <Box>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            uploadService.viewFile(candidate.cvFileName);
                                                        }}> View and Download CV
                                                    </Button>
                                                    &nbsp;&nbsp;
                                                    <Button style={{marginHorizontal: 9}}
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => {
                                                                uploadService.viewFile(candidate.cvPhoto);
                                                            }}> View and Download Photo
                                                    </Button>

                                                </Box>
                                            </Grid>
                                        </CardActions>

                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                    <br/>
                </Container>
            </Box>
            <p><br></br></p>
        </ThemeProvider>
    );
};

export default CandidateHiredDetail;


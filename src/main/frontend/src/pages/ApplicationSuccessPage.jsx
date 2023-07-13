import React from "react";
import {Box, Grid, ThemeProvider, Container, Typography, Button} from "@mui/material";
import HeaderJob from "../components/header/HeaderJob";
import theme from "../theme/Theme"
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {useNavigate, useParams} from "react-router-dom";
import AuthService from "../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function ApplicationSuccessPage() {
    let navigate = useNavigate();
    let { title } = useParams();
    // console.log(title)
    const role = AuthService.getCurrentRole();

    if (role === "KANDIDAT" || role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderJob> </HeaderJob>
                    <br/>
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="center" item xs={10}>
                                <CheckCircleOutlineRoundedIcon color="success" sx={{fontSize: 300}}/>
                                <Typography variant="h5">
                                    Success!
                                    <br/>
                                    Your Application for {title} has been summitted!
                                </Typography>
                                <br/>
                                <br/>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        navigate("/status-applicant");
                                    }}>
                                    See Your Applications
                                </Button>
                                <br/>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        );
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
}

export default ApplicationSuccessPage;

import React from "react";
import {Box, Grid, ThemeProvider, Container, Typography, Button} from "@mui/material";
import HeaderJob from "../components/header/HeaderJob";
import JobList from "../components/list/JobList";
import theme from "../theme/Theme"
import AuthService from "../services/auth.service";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

function JobListPage() {
    const role = AuthService.getCurrentRole();

    if (role === "KANDIDAT" || role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderJob> </HeaderJob>
                    <br/>
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="left" item xs={10}>
                                <JobList></JobList>
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

export default JobListPage;

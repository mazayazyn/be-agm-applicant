import React from "react";
import {Box, Grid, ThemeProvider, Container, Typography} from "@mui/material";
import StatusTab from "../components/tab/StatusTab";
import HeaderStatusCandidate from "../components/header/HeaderStatusCandidate"
import theme from "../theme/Theme"
import AuthService from "../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function StatusCandidatePage() {
    const role = AuthService.getCurrentRole();

    if (role === "KANDIDAT") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderStatusCandidate> </HeaderStatusCandidate>
                    <br/>
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="left" item xs={10}>
                                <StatusTab></StatusTab>
                            </Grid>
                        </Grid>
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
}

export default StatusCandidatePage;

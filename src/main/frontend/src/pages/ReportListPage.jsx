import React from "react";
import {Box, Grid, ThemeProvider, Container, Typography} from "@mui/material";
import ReportList from "../components/report/ReportList";
import theme from "../theme/Theme"
import HeaderReport from "../components/header/HeaderReport";
import AuthService from "../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function ReportListPage() {
    const role = AuthService.getCurrentRole();

    if (role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderReport> </HeaderReport>
                    <br/>
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="left" item xs={10}>
                                <ReportList></ReportList>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="center" item xs={10}>
                                <br/><br/><br/><br/><br/><br/>
                                <RemoveCircleOutlineIcon color="error" sx={{fontSize: 300}}/>
                                <Typography variant="h2">
                                    <br/>
                                    You don't have access to this page
                                </Typography>
                                <br/>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        )
    }
}

export default ReportListPage;

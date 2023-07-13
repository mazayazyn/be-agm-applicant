import React from "react";
import {Box, Grid, ThemeProvider, Container, Typography} from "@mui/material";
import UploadReport from "../components/report/UploadReport";
import theme from "../theme/Theme"
import HeaderDetailReport from "../components/header/HeaderDetailReport";
import AuthService from "../services/auth.service";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function UploadReportPage() {
    const role = AuthService.getCurrentRole();

    if (role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <Box>
                    <HeaderDetailReport> </HeaderDetailReport>
                    <br />
                    <Container fixed>
                        <Grid align="center">
                            <Grid align="left" item xs={10}>
                                <UploadReport></UploadReport>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
    else {
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

export default UploadReportPage;
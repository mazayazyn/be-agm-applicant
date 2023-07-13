import React from "react";
import { Box, Grid, ThemeProvider, Container } from "@mui/material";
import HeaderIndustryForm from "../components/header/HeaderIndustryForm";
import Industry from "../components/form/ProfileForm/Industry";
import theme from "../theme/Theme"

function IndustryFormPage() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <HeaderIndustryForm> </HeaderIndustryForm>
                <br />
                <Container fixed>
                    <Grid align="center">
                        <Grid align="left" item xs={10}>
                            <Industry></Industry>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default IndustryFormPage;

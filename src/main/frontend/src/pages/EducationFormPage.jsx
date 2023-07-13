import React from "react";
import { Box, Grid, ThemeProvider, Container } from "@mui/material";
import HeaderEducationForm from "../components/header/HeaderEducationForm";
import Education from "../components/form/ProfileForm/Education";
import theme from "../theme/Theme"

function EducationFormPage() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <HeaderEducationForm> </HeaderEducationForm>
                <br />
                <Container fixed>
                    <Grid align="center">
                        <Grid align="left" item xs={10}>
                            <Education></Education>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default EducationFormPage;

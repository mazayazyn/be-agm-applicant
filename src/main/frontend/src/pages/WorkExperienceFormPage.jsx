import React from "react";
import { Box, Grid, ThemeProvider, Container } from "@mui/material";
import HeaderWorkExperience from "../components/header/HeaderWorkExperience";
import WorkExperience from "../components/form/ProfileForm/WorkExperience";
import theme from "../theme/Theme"

function WorkExperienceFormPage() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <HeaderWorkExperience> </HeaderWorkExperience>
                <br />
                <Container fixed>
                    <Grid align="center">
                        <Grid align="left" item xs={10}>
                            <WorkExperience></WorkExperience>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default WorkExperienceFormPage;

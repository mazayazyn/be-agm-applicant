import React from "react";
import { Box, Grid, ThemeProvider, Container } from "@mui/material";
import HeaderSkillsForm from "../components/header/HeaderSkillsForm";
import Skills from "../components/form/ProfileForm/Skills";
import theme from "../theme/Theme"

function SkillsFormPage() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <HeaderSkillsForm> </HeaderSkillsForm>
                <br />
                <Container fixed>
                    <Grid align="center">
                        <Grid align="left" item xs={10}>
                            <Skills></Skills>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default SkillsFormPage;

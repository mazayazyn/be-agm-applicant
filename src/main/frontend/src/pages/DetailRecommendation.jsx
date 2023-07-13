import React from "react";
import { Box, Grid, ThemeProvider, Container } from "@mui/material";
import HeaderCreateProfile from "../components/header/HeaderCreateProfile";
import theme from "../theme/Theme"
import CreateProfile from "../components/form/ProfileForm/CreateProfile";

function DetailRecommendation() {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <HeaderCreateProfile></HeaderCreateProfile>
                <br />
                <Container fixed>
                    <Grid align="center">
                        <Grid align="left" item xs={10}>
                            <CreateProfile></CreateProfile>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default DetailRecommendation;

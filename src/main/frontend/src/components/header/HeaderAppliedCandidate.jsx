import * as React from 'react';
import  {Box, Grid, Typography, Button, Container, Link, Stack} from "@mui/material";
import classes from '../../styles/index.module.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';


export default function HeaderShortlistedCandidate() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="white" href="/job-list">
            Job List
        </Link>,
        <Typography key="3" color="white">
            Applied Candidate
        </Typography>
    ];

    return (
        <Box py={15} className={classes.headers}>
            <Grid>
                <Grid>
                    <Box>
                        <Container>
                            <Typography  style={{ fontWeight: "bold" }} variant = "h5" align="left">Applied Candidate</Typography>
                            <Stack spacing={2}>
                                <Breadcrumbs separator="›" aria-label="breadcrumb" color="#ffffff">
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </Stack>
                        </Container>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
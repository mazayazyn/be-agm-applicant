import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderAppliedCandidate from "../header/HeaderAppliedCandidate";
import AuthService from "../../services/auth.service";
import {Box, Grid, ThemeProvider, Typography} from "@mui/material";
import theme from "../../theme/Theme"

export default function CandidateList() {
    const role = AuthService.getCurrentRole();

    const [candidateList, setCandidateList] = useState([]);
    const [refreshList, setRefreshList] = useState([1]);
    const [listUserVacancy, setListUserVacancy] = useState([]);
    let { idVacancy } = useParams();
    let navigate = useNavigate();
    const columns = [
        { field: 'fullName', headerName: 'Candidate Name', width: 150 },
        { field: 'yearExperience', headerName: 'Years of Experience', width: 150, type: 'number' },
        { field: 'currentSalary', headerName: 'Current Salary', width: 150, type: 'number' },
        { field: 'jobLevel', headerName: 'Job Level', width: 150 },
        { field: 'jobPosition', headerName: 'Job Position', width: 150 },
        { field: 'industry', headerName: 'Industry', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 350,
            filterable: false,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={(e) => {
                            navigate("/candidate-detail/" + params.row.id);
                        }}
                    >
                        Detail
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={(e) => {
                            axios.post("/api/shortlist/" + handleFindUserVacancyId(params.row) + "/2");
                            handleRefreshList();
                        }}
                    >
                        Shortlist
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={(e) => {
                            axios.post("/api/shortlist/" + handleFindUserVacancyId(params.row) + "/3");
                            handleRefreshList();
                        }}
                    >
                        Unsuitable
                    </Button>
                </strong>
            ),
        }
    ];

    useEffect(() => {
        axios.get("/api/listUserVacancyByVacancy/" + idVacancy).
        then(res => {
            const payload = [];
            const payload2 = [];
            for (var i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].appliedStatus === 1) {
                    payload.push(res.data.result[i].user.candidate);
                    payload2.push(res.data.result[i]);
                }
            }
            setCandidateList(payload);
            setListUserVacancy(payload2);
        })
            .catch(err => {
                console.log(err)
            })
    }, [refreshList])

    const handleRefreshList = (e) => {
        if (refreshList === 1) {
            setRefreshList(2)
        } else {
            setRefreshList(1)
        }
    }

    const handleFindUserVacancyId = (params) => {
        for (var i = 0; i < listUserVacancy.length; i++) {
            if (listUserVacancy[i].user.candidate === params) {
                return (listUserVacancy[i].idUser_Vacancy);
            }
        }
    }

    if (role === "HR") {
        return (
            <ThemeProvider theme={theme}>
                <br />
                <HeaderAppliedCandidate> </HeaderAppliedCandidate>
                <br />

                <Container>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            handleRefreshList();
                        }}
                    >
                        Refresh Candidate List
                    </Button>
                </Container>
                <br />
                <Container>
                    <div style={{ width: 1260 }}>
                        <DataGrid
                            autoHeight
                            rows={candidateList}
                            columns={columns}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            sx={{
                                boxShadow: 2,
                                border: 2,
                                borderColor: 'primary'}}
                        />
                    </div>
                </Container>
            </ThemeProvider>
        );
    } else {
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

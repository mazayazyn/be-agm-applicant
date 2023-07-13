import React from "react";
import { Box, Button, Select, MenuItem, Input, Card, CardContent, Grid, Typography, CardActions } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import vacancyService from "../../services/vacancy-service";
import AuthService from "../../services/auth.service";

const JobList = (props) => {
    let navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [idUser, setIdUser] = useState(0);
    const role = AuthService.getCurrentRole();

    // console.log(role)

    useEffect(async() => {
        let user = await vacancyService.getUserId()
        setIdUser(user.data.data.id)
    }, [])

    useEffect(() => {
        axios.get("api/list-vacancy").
        then(res => {
            // console.log(res.data)
            setJobs(res.data.result)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const [filter, setFilter] = useState("");
    const searchText = (event) => {
        setFilter((event.target.value));
    }
    // console.warn(filter)
    let dataSearch = jobs.filter(item => {
        return Object.keys(item).some(key =>
            // console.log(filter.toString().toLowerCase());
            // console.log(item[key].toString().toLowerCase());
            item[key]?.toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    });


    const [jobSearch, setJobSearch] = useState({
        vacanciesStatus: 1,
    });

    const handleChange = (e) => {
        setJobSearch((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    // console.log(jobSearch);

    return (
        <Grid align="center">
            <Grid align="left" item xs={10}>
                <section>
                    <Box>
                        <Box display="flex" justifyContent="space-between">
                            <Box>
                                <OutlinedInput
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                    size="small"
                                    variant="outlined"
                                    type="search"
                                    placeholder={"Search Anything"}
                                    value={filter}
                                    onChange={searchText.bind(this)}
                                />
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography style={{ fontWeight: "bold", fontSize: 24 }}>Filter by:</Typography>
                                {' '}
                                <Select onChange={handleChange}
                                        value={jobSearch.vacanciesStatus}
                                        name="vacanciesStatus"
                                        size="small">
                                    <MenuItem value={1}>Job Open</MenuItem>
                                    <MenuItem value={4}>Job Closed</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                    </Box>
                    <br />

                    {dataSearch.map((item, index) => {
                        if (item.status === jobSearch.vacanciesStatus) {
                            return (
                                <Card align="left" variant="outlined" sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Box>
                                            <Grid container alignItems={"center"}>
                                                <Grid item xs>
                                                    <Grid item container direction="column" alignItems="flex-end"
                                                          xs>
                                                        <Typography variant="inherit">
                                                            <AccessAlarmIcon fontSize="inherit" />
                                                            {' '}
                                                            {`${item.closingDate}`}
                                                        </Typography>
                                                    </Grid>
                                                    <Typography
                                                        color="#454ADE"
                                                        sx={{ fontWeight: 'bold', fontSize: 24 }}
                                                    >
                                                        {item.title}
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                                                        {item.industry}
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="inherit" sx={{ lineHeight: 2 }}>
                                                        <LocationOnIcon fontSize="inherit" />
                                                        {' '}
                                                        {item.workingLocation}
                                                        <br />
                                                        <AttachMoneyIcon fontSize="inherit" />
                                                        {' '}
                                                        {`IDR ${item.startSalary} - ${item.endSalary}`}
                                                        <br />
                                                        <WorkIcon fontSize="inherit" />
                                                        {' '}
                                                        {`${item.yearsOfExperience} of experience`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Grid item container direction="column" alignItems="flex-end" xs>
                                        </Grid>
                                        <Grid item mt={2}>
                                            { role === 'KANDIDAT' ? (
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail/" + idUser + "/" + item.id);
                                                    }}> Detail
                                                    </Button>

                                                </Box>
                                            ) : role == 'HR' ? (
                                                <Box>
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/job-detail/" + idUser + "/" + item.id);
                                                    }}> See Recommendation Candidate
                                                    </Button>
                                                    {' '}
                                                    {' '}
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/candidate-list/" + item.id);
                                                    }}> See Applied Candidate
                                                    </Button>
                                                    {' '}
                                                    {' '}
                                                    <Button
                                                        variant="contained" onClick={() => {
                                                        navigate("/shortlist/" + item.id);
                                                    }}> See Shortlist Candidate
                                                    </Button>
                                                </Box>
                                            ) : (
                                                < br />
                                            )}
                                        </Grid>
                                    </CardActions>
                                </Card>
                            )
                        }
                    })}

                </section>
            </Grid>
        </Grid>
    )
}

export default JobList;

import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography, CardActions, ThemeProvider, Modal, Container } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BusinessIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import HeaderShortlistedCandidate from "../header/HeaderShortlistedCandidate";
import { InterviewForm } from '@/components/form/InterviewForm';
import AuthService from "../../services/auth.service";
import theme from "../../theme/Theme"

export default function ShortList() {
  const role = AuthService.getCurrentRole();

  const [shortData, setShortData] = useState([]);
  const [refreshList, setRefreshList] = useState([1]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idInterview, setIdInterview] = useState(0);
  const [emailInterview, setEmailInterview] = useState("");

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/listUserVacancyByVacancy/" + id).
    then(res => {
      const payload = [];
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].appliedStatus === 2) {
          payload.push(res.data.result[i]);
        }
      }
      setShortData(payload);
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

  if (role === "HR") {
    if (shortData.length === 0) {
      return (
          <ThemeProvider theme={theme}>
            <Grid container align="center">
              <HeaderShortlistedCandidate> </HeaderShortlistedCandidate>
              <Grid item xs>
                <Typography
                    color="secondary"
                    sx={{ fontWeight: 'bold', fontSize: 24 }}>
                  {"No Shortlisted Candidates"}
                </Typography>
              </Grid>
            </Grid>
          </ThemeProvider>
      )
    } else {
      return (
          <ThemeProvider theme={theme}>
            <Grid align="center">
              <HeaderShortlistedCandidate> </HeaderShortlistedCandidate>
              <br />
              <Container fixed>
                <Grid align="left" item xs={10}>
                  <section>
                    {shortData.map((item, index) => {
                      return (
                          <Card align="left" variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent sx={{display:"flex", justifyContent:"space-between"}}>
                              <Box>
                                <Grid container alignItems={"center"}>
                                  <Grid item xs>
                                    <Typography
                                        color="#454ADE"
                                        sx={{ fontWeight: 'bold', fontSize: 24 }}>
                                      {item.user.candidate.fullName}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                                      {item.user.email}
                                    </Typography>
                                    <br />
                                    <Typography variant="inherit" sx={{ lineHeight: 2 }}>
                                      <BusinessIcon fontSize="inherit" />
                                      {' '}
                                      {item.user.candidate.jobPosition}
                                      <br />
                                      <BusinessCenterIcon fontSize="inherit" />
                                      {' '}
                                      {item.user.candidate.jobLevel}
                                      <br />
                                      {/*<AttachMoneyIcon fontSize="inherit" />*/}
                                      {/*{' '}*/}
                                      {/*{`IDR ${item.user.candidate.currentSalary}`}*/}
                                      {/*<br />*/}
                                      <WorkHistoryIcon fontSize="inherit" />
                                      {' '}
                                      {`${item.user.candidate.yearExperience} years of experience`}

                                    </Typography>
                                    <Typography>
                                      Interview: {item.interviewDateTime ? item.interviewDateTime : "None"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box>
                                <Grid item mt={2}>
                                  <Box>
                                    <DeleteIcon sx={{cursor:"pointer"}}
                                                onClick={() => {
                                                  axios.post("/api/shortlist/" + item.idUser_Vacancy + "/1");
                                                  handleRefreshList();
                                                }}> Delete
                                    </DeleteIcon>
                                  </Box>
                                </Grid>
                              </Box>
                            </CardContent>
                            <CardActions>
                              <Grid item container direction="column" alignItems="flex-end" xs>
                              </Grid>
                              <Grid item mt={2}>
                                <Box>
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        navigate("/candidate-detail/" + item.user.candidate.id);
                                      }}> Detail
                                  </Button>
                                </Box>
                              </Grid>
                              <Grid item mt={2}>
                                <Box>
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => {
                                        setEmailInterview(item.user.email)
                                        setIdInterview(item.idUser_Vacancy)
                                        handleOpen()
                                      }}> Schedule Interview
                                  </Button>
                                </Box>
                              </Grid>
                              <Grid item mt={2}>
                                <Box>
                                  <Button
                                      variant="contained"
                                      color="success"
                                      onClick={() => {
                                        axios.post("/api/shortlist/" + item.idUser_Vacancy + "/6");
                                        handleRefreshList();
                                      }}> Hire
                                  </Button>
                                </Box>
                              </Grid>
                              <Grid item mt={2}>
                                <Box>
                                  <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => {
                                        axios.post("/api/shortlist/" + item.idUser_Vacancy + "/3");
                                        handleRefreshList();
                                      }}> Unsuitable
                                  </Button>
                                </Box>
                              </Grid>
                            </CardActions>
                          </Card>
                      )
                    })}
                  </section>
                </Grid>
                <Modal open={open} onClose={() => handleClose()}>
                  <InterviewForm idUser_Vacancy={idInterview} email={emailInterview} />
                </Modal>
              </Container>
            </Grid>

          </ThemeProvider>
      )}
  } else {
    return (
        <ThemeProvider theme={theme}>
          <Box>
            <Container fixed>
              <Grid align="center">
                <Grid align="center" item xs={10}>
                  <br />
                  <br />
                  <RemoveCircleOutlineIcon color="error" sx={{ fontSize: 300 }} />
                  <Typography variant="h2">
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

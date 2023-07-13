import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Container, Grid, Typography} from '@mui/material';
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import uploadService from "../../services/upload-service";
import reportService from "../../services/report-service";
import axios from "axios";

export default function UploadReport(props) {
    let { idCandidate } = useParams();
    const[candidate, setCandidate]=useState([])
    const [uploaded, setUploaded] = useState(false)
    const [reports, setReports] = useState([])
    const [errorFile, setErrorFile] = useState(false)
    const [errorDescription, setErrorDescription] = useState('')
    const {id} = useParams()
    const loadData = async ()=>{
        let data = await reportService.getAllReport(id)
        setReports([...data.data.data])
    }
    const [hiredData, setHiredData] = useState([]);
    const [refreshList, setRefreshList] = useState([1]);
    let navigate = useNavigate();

    useEffect((e)=> {
        loadData()
    }, [])

    useEffect(() => {
        axios.get("/api/listUserVacancyByVacancy/" + id).
        then(res => {
            const payload = [];
            for (var i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].appliedStatus === 6) {
                    payload.push(res.data.result[i]);
                }
            }
            setHiredData(payload);
        })
            .catch(err => {
                console.log(err)
            })
    }, [refreshList])

    useEffect(() => {
        axios.get("/api/profile/getById/" + idCandidate).
        then(res => {
            // console.log(res.data)
            setCandidate(res.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const selectFile=(e)=> {
        e.preventDefault()
        let inputFile = document.getElementById('file')
        inputFile.onchange = async(x)=> {
            setErrorFile(false)
            setErrorDescription('')
            let file = x.target.files[0]
            let data = await uploadService.uploadFile(file)
            x.target.value = null
            if(data.data.error=='true'){
                setErrorFile(true)
                setErrorDescription(data.data.errorDescription)
                return
            }
            let report = await reportService.createReport(id, {
                "fileName": data.data.fileName,
                "fileNameOriginal": data.data.fileNameOriginal
            })
            setUploaded(true)
            loadData()
        }
        inputFile.click()
    }

    const handleRefreshList = (e) => {
        if (refreshList === 1) {
            setRefreshList(2)
        } else {
            setRefreshList(1)
        }
    }

    const deleteReport=(id)=> {
        return async()=>{
            await reportService.deleteReport(id)
            loadData()
        }
    }

    const viewReport=(fileName)=> {
        return ()=>{
            uploadService.viewFile(fileName)
        }
    }

    const downloadTemplate=(e)=> {
        window.location.href="https://propensib07.s3.ap-southeast-1.amazonaws.com/cv/report-template.docx"
    }

    const errorMessage = {
        color: 'red',
        fontSize: '12px',
        fontWeight: 'bold'
    };

    return (
        <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            py="10vh"
        >
            <Container>
                <Grid align="center">
                    <Button onClick={downloadTemplate} variant="contained"> Download Report Template</Button>
                    <p></p>
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom >
                        Please use this template when uploading reports and please submit it as pdf file.
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom >
                        The file name format is Candidate Name - Vacancy Title - Company.
                    </Typography>
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom >
                        Example: Mazaya Husna - Internal Product Manager - PT Tokopedia Indonesia.pdf
                    </Typography>
                    <br></br>
                </Grid>

                <Grid justifyContent="flex-end" margin={2}>
                    <Button onClick={selectFile} variant="contained"><AttachFileIcon />  Upload File </Button>
                    <input type='file' accept='.pdf' multiple={false} id='file' style={{display:'none'}}></input>
                </Grid>

                <Table variant="body2">
                    <TableHead>
                        <TableRow align="center">
                            <TableCell><b>File Name</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            reports.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7"><p></p>No Reports Available</td>
                                </tr> :
                                reports.map((a,b)=> (
                                    <tr key={a.id}>
                                        <TableCell>
                                            {a.fileNameOriginal}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={deleteReport(a.id)}>Delete</Button>
                                            <Button onClick={viewReport(a.fileName)}>View and Download</Button>
                                        </TableCell>
                                    </tr>
                                ))}
                    </TableBody>
                </Table>
            </Container>

            <Box py="5vh"></Box>
            <br></br><br></br>
            <Typography variant="h5" component="div">
                <b>Hired Candidate</b>
            </Typography>
            <br></br>

            {
                hiredData.length === 0 ?
                    <tr align="center">
                        <td colSpan="7"><p></p>No Hired Candidates</td>
                    </tr> :
                    hiredData.map((item, index) => {
                        return (
                            <Card align="left" variant="outlined" sx={{ minWidth: 1075 }}>

                                <CardContent>
                                    <Box>
                                        <Grid container alignItems={"center"}>
                                            <Grid item xs>
                                                <Typography
                                                    color="#454ADE"
                                                    sx={{ fontWeight: 'bold', fontSize: 24 }}
                                                >
                                                    {item.user.candidate.fullName}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                                                    {item.user.email}
                                                </Typography>

                                            </Grid>
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
                                                    navigate("/detail-hired-candidate/" + item.user.candidate.id);
                                                }}> Detail
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    uploadService.viewFile(item.user.candidate.cvFileName);
                                                }}> View and Download CV
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button style={{marginHorizontal: 9}}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        uploadService.viewFile(item.user.candidate.cvPhoto);
                                                    }}> View and Download Photo
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => {
                                                    navigate(axios.post("/api/shortlist/" + item.idUser_Vacancy + "/2"));
                                                    handleRefreshList();
                                                }}> Delete
                                            </Button>
                                        </Box>
                                    </Grid>
                                </CardActions>

                            </Card>
                        )
                    })}
        </Box>
    )
}


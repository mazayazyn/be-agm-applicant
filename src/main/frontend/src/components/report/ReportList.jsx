import React, {Component} from 'react';
import {Button, Container, Typography} from '@mui/material';
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import axios from "axios";

export default class ReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vacancies: [],
        };
    }

    componentDidMount() {
        this.getReports();
    }

    getReports() {
        axios.get("/api/list-vacancy")
            .then((data) => {
                this.setState({vacancies: data.data.result});
            });
    }

    uploadReport(id) {
        return ()=>{
            window.location.href="/view-report/"+id
        }
    }

    render() {
        return (
        <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            py="10vh"
        >
            <Container mb={12}>
                <Typography variant="h5" component="div" align="center">
                    <b>Vacancy List</b>
                    <p></p>
                </Typography>

                <Table variant="body2">
                    <TableHead>
                        <TableRow align="center">
                            <TableCell><b>Job Vacancies</b></TableCell>
                            <TableCell><b>Company</b></TableCell>
                            <TableCell><b>Company Email</b></TableCell>
                            <TableCell><b>Close Date</b></TableCell>
                            <TableCell><b>Report</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.vacancies.length === 0 ?
                                <tr align="center">
                                    <td colSpan="7"><p></p>No Vacancy Available</td>
                                </tr> :
                                this.state.vacancies.map((vacancy) => (
                                    <tr key={vacancy.id}>
                                        <TableCell>{vacancy.title}</TableCell>
                                        <TableCell>{vacancy.companyName}</TableCell>
                                        <TableCell>{vacancy.companyEmail}</TableCell>
                                        <TableCell>{vacancy.closingDate}</TableCell>
                                        <TableCell>
                                            <Button variant='outlined' onClick={this.uploadReport(vacancy.id)}>Report</Button>
                                        </TableCell>
                                    </tr>
                                ))
                        }
                    </TableBody>
                </Table>
            </Container>

        </Box>)
}}
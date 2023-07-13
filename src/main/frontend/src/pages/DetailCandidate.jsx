import React, {useState, useEffect } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate , useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import Container from '@material-ui/core/Container';
import MuiAlert from '@mui/material/Alert';
import HeaderRecommendation from '../components/header/HeaderRecommendation';

const DetailCandidate = (props) => {
    let navigate = useNavigate();
    const [detailCandidate, setDetailCandidate] = useState('');
    const [randomNumber, setRandomNumber] = useState(0);
    let { idVacancy } = useParams();
    let { idUser } = useParams();
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const getDetailCandidate = async () => {
        try {
            const { data: response } = await axios.get("/api/detail-recommendation/"+idUser+"/"+idVacancy);
            setDetailCandidate(response?.result);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const AlertError = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleEmail = (e) => {
        e.preventDefault();
        return axios({
            method: 'post',
            url: '/api/email/'+detailCandidate.user.id+'/'+detailCandidate.vacancy.id,
            headers: {
                'content-type': 'application/json'
            }
        }).then(
            () => {
                setMessage("Send Recommendation Successful!")
                setOpen(true);
            },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
                setMessage("Cannot send email for this time...")
                setOpenError(true);
            }
        )
    }

    useEffect(() => {
        getDetailCandidate();
    }, [randomNumber]);

    console.log(detailCandidate)

    return (
        <>
            <HeaderRecommendation></HeaderRecommendation>
            <Container fixed>
                {/* <Typography sx={{fontWeight:'bold', my:3, fontSize:24}} color="#454ADE">
                Recommendation Detail
            </Typography> */}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                    <AlertError onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </AlertError>
                </Snackbar>
                <Card sx={{ minWidth: 275, my:4}}>
                    <CardContent>
                        <Typography variant="h5" sx={{fontWeight:'bold'}}>{detailCandidate?.candidate?.fullName}</Typography>
                        <Typography>
                            {detailCandidate?.user?.email}
                        </Typography>
                        <Box sx={{my:3}}>
                            <Box sx={{display:'flex', my:1}}>
                                <Box sx={{display:'flex', alignItems:'center', mr:1}}>
                                    <AttachMoneyIcon fontSize="inherit"/> {' '} <Typography sx={{ml:1}}>Current Salary:</Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        {detailCandidate?.candidate?.currentSalary}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{display:'flex', my:1}}>
                                <Box sx={{display:'flex', alignItems:'center', mr:1}}>
                                    <WorkIcon fontSize="inherit"/> {' '} <Typography sx={{ml:1}}>Industry:</Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        {detailCandidate?.candidate?.industry}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{my:2}}>
                            <Typography sx={{fontWeight:'bold', fontSize:18}} color="#454ADE">
                                About
                            </Typography>
                            <Typography sx={{textAlign:'left' }} color="text.secondary">
                                {detailCandidate?.candidate?.about}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions sx={{display:'flex', alignItems: 'flex-end', justifyContent:'end'}}>
                        <Button variant="contained" onClick={handleEmail} sx={{backgroundColor:'#141414!important'}}>Send Recommendation</Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
}

export default DetailCandidate;

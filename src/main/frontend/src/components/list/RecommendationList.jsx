import {React,useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";
import Container from '@material-ui/core/Container';

const Recommendation = (props) => {
    let navigate = useNavigate();
    const[recommendation, setRecommendation]=useState([]);
    const [randomNumber, setRandomNumber] = useState(0);

    useEffect(() => {
        axios.get("/api/recommendation/"+props.props).
        then(
            res => {
                setRecommendation(res.data.result)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }, [randomNumber])

    const roles = AuthService.getCurrentRole();

    // console.log(recommendation)

    return (
        <>
        { roles === 'HR' ? (
            <>
            <Typography variant="h5" component="div" sx={{fontWeight:'bold', mb:2, fontSize:24}} color="#454ADE">
                Recommendation for This Job
            </Typography>
            {recommendation.map(function (item, index){
                return (
                    <Card sx={{ minWidth: 275, my:2}}>
                        <CardContent>
                        <Typography sx={{ fontSize: 14, textAlign:'left' }} color="text.secondary" gutterBottom>
                            Recommendation
                        </Typography>
                        <Typography variant="h6" component="div" sx={{fontWeight:'bold', textAlign:'left'}}>
                            {item.candidate.fullName}
                        </Typography>
                        <Typography sx={{ mb: 1.5, textAlign:'left' }} color="text.secondary">
                            Industry: {item.user.candidate.industry}
                        </Typography>
                        </CardContent>
                        <CardActions sx={{display:'flex', alignItems: 'flex-end', justifyContent:'end'}}>
                        <Button size="small" onClick={() => { navigate("/candidate-detail/" + item.user.id + "/" + props.props); }}>Detail</Button>
                        </CardActions>
                    </Card>
                )
            })}
            </>
        ) : (
            <></>
        )}
        </>
    )
}

export default Recommendation;
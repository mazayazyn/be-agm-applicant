import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography} from '@mui/material';
import {Box} from "@material-ui/core";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import uploadService from "../../../services/upload-service";
import profileService from "../../../services/profile-service";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AuthService from "../../../services/auth.service";

export default function Candidate(props) {

    const {id}= useParams()

    const [readProfile, setReadProfile] = useState([])
    const [openField, setOpenField] = useState(false)
    const [statusMsg, setStatusMsg] = useState('')

    const [validate, setValidate]=useState({})

    const [errorFile, setErrorFile] = useState(false)
    const [errorImage, setErrorImage] = useState(false)
    const [errorDescription, setErrorDescription] = useState('')
    const [errorDescriptionImage, setErrorDescriptionImage] = useState('')
    const [uploadedImage, setUploadedImage] = useState(false)

    const selectFile=(e)=> {
        setErrorFile(false)
        setErrorDescription('')
        e.preventDefault()
        let inputFile = document.getElementById('file')
        inputFile.onchange = async(x)=> {
            if (!openField) return
            let file = x.target.files[0]
            let data = await uploadService.uploadFile(file)
            if(data.data.error=='true'){
                setErrorFile(true)
                setErrorDescription(data.data.errorDescription)
                return
            }
            // console.log(data.data.fileName)
            setReadProfile({...readProfile, cvFileName: data.data.fileName})
            x.target.value = null
        }
        inputFile.click()
    }

    const selectImage=(e)=> {
        setErrorImage(false)
        setErrorDescriptionImage('')
        e.preventDefault()
        let inputFile = document.getElementById('file2')
        inputFile.onchange = async(x)=> {
            let file = x.target.files[0]
            let data = await uploadService.uploadFile(file)
            if(data.data.error=='true'){
                setErrorImage(true)
                setErrorDescriptionImage(data.data.errorDescription)
                return
            }
            // console.log(data.data.fileName)
            setReadProfile({...readProfile, cvPhoto: data.data.fileName})
            setUploadedImage(true)
            x.target.value = null
        }
        inputFile.click()
    }

    const viewFile=(e)=> {
        uploadService.viewFile(readProfile.cvFileName)
    }

    const errorMessage = {
        color: 'red',
        fontSize: '12px',
        fontWeight: 'bold'
    };

    const handleClick=(e)=> {
        e.preventDefault()
        const newField = {
            fullName: '',
            noTelp: '',
            about: '',
            appliedStatus: '',
            currentSalary: '',
            dateOfBirth: '',
            jobLevel: '',
            jobPosition: '',
            yearExperience: '',
            industry:''
        }

    }

    const jobTitles = [{
        value: 'Managerial',
        label:'Managerial'
    },{
        value: 'Supervisory',
        label:'Supervisory'
    },{
        value: 'Officers',
        label:'Officers'
    }]

    const industryList = [{
        value: 'Energy',
        label:'Energy'
    },{
        value: 'Materials',
        label:'Materials'
    },{
        value: 'Industrials',
        label:'Industrials'
    },{
        value: 'Consumer Discretionary',
        label:'Consumer Discretionary'
    },{
        value: 'Consumer Staples',
        label:'Consumer Staples'
    },{
        value: 'Health Care',
        label:'Health Care'
    },{
        value: 'Financials',
        label:'Financials'
    },{
        value: 'Information Technology',
        label:'Information Technology'
    },{
        value: 'Real Estate',
        label:'Real Estate'
    },{
        value: 'Communication Services and Utilities Sector',
        label:'Communication Services and Utilities Sector'
    }]

    useEffect(async()=>{
        try{
            setOpenField(false)
            let getuser = await profileService.getUserEmail()
            setReadProfile(getuser.data.data.candidate)
            // console.log(getuser.data.data)
        }
        catch(e){
            window.location.href = "/profile/create-profile"
        }
    },[])

    const saveCandidate = () => {
        setValidate({})
        const {fullName, noTelp, about, industry, currentSalary, dateOfBirth, jobLevel, jobPosition, yearExperience, cvFileName, cvPhoto, errorFile, errorDescription} = readProfile
        if (!fullName){
            setValidate({fullName: true})
            return
        }
        if (!noTelp){
            setValidate({noTelp: true})
            return
        }
        if (!about){
            setValidate({about: true})
            return
        }
        if (!industry){
            setValidate({industry: true})
            return
        }
        if (!jobLevel){
            setValidate({jobLevel: true})
            return
        }
        if (!jobPosition){
            setValidate({jobPosition: true})
            return
        }
        if (!yearExperience){
            setValidate({yearExperience:  'Missing required value for the field \'Years of Experience\'!'})
            return
        }
        else{
            if(!yearExperience.match(/^[0-9]+$/)){
                setValidate({yearExperience:  '\'Years of Experience\' field must be a number'})
                return
            }
        }
        if (!currentSalary){
            setValidate({currentSalary: 'Missing required value for the field \'Current Salary\'!'})
            return
        }
        else{
            if (!(currentSalary+'').match(/^[0-9]+$/)){
                setValidate({currentSalary:  '\'Current Salary\' field must be a number'})
                return
            }
        }
        if (!dateOfBirth){
            setValidate({dateOfBirth: true})
            return
        }
        if (!cvFileName){
            setValidate({cvFileName: true})
            return
        }
        if (!cvPhoto){
            setValidate({cvPhoto: true})
            return
        }
        profileService.updateUser(readProfile)
        setOpenField(false)
    }

    const [email, setEmail] = React.useState();
    const [role, setRole] = React.useState();

    useEffect(() => {
        const emails = AuthService.getCurrentEmail();
        const roles = AuthService.getCurrentRole();
        setEmail(emails);
        setRole(roles);
    }, []);

    const [username, setUsername] = React.useState("");

    useEffect(() => {
        const emails = AuthService.getCurrentEmail();
        AuthService.getUsername();
        setUsername(localStorage.getItem("username"))
        setEmail(emails);
    }, []);

    return (
        <>

            <Box
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems="center"
                py="10vh"
            >

                <Container mb={12} align="center">

                    <div>
                        {statusMsg}
                    </div>

                    <CardActions>

                        {!openField && (
                            <Button variant="contained" onClick={() => {
                                setOpenField(true)
                                setStatusMsg('')
                            }} >
                                <EditIcon>Edit Profile</EditIcon>
                            </Button>
                        )}


                        {openField && (
                            <Button variant="contained" onClick={saveCandidate} >
                                Save Updated Profile
                            </Button>
                        )}
                    </CardActions>

                    <Grid justifyContent="flex-end" margin={2} align="center">
                        <Button onClick={selectImage} disabled={!openField} variant="contained"><AttachFileIcon />  Update Photo </Button>
                        <br></br>
                        <input type='file' accept='.jpeg, .png, .jpg' multiple={false} id='file2' style={{display:'none'}}></input>
                        <br></br>
                        {readProfile.cvPhoto?<img className='img-photo' style={{width:200, height:200, borderRadius:200}} src={readProfile.cvPhoto}/>:''}
                        <Typography
                            color="#454ADE"
                            sx={{ fontWeight: 'bold', fontSize: 24 }}
                            margin={2}
                        >
                            {username}
                        </Typography>
                        <Typography  style={{ fontWeight: "bold" }} variant = "h6" align="center">{email}</Typography>
                    </Grid>

                    <Card sx={{ minWidth: 900, margin: 1, maxWidth: 1000 }} align="center">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                <b>Personal Details</b>
                            </Typography>

                            <Grid class="form-group col-md-6">
                                <Typography sx={{ fontSize: 16 }} gutterBottom >
                                    <h4> Full Name </h4>
                                </Typography>
                                <Typography variant="body2">
                                    <TextField
                                        id="fullName-textfield"
                                        variant="outlined"
                                        value={readProfile.fullName}
                                        sx={{ width: 750 }}
                                        onChange={(e) => {
                                            setReadProfile({
                                                ...readProfile,
                                                about: e.target.value,
                                            })
                                        }}
                                        disabled={!openField}
                                    />
                                    <br />{validate.fullName? <span style={errorMessage}>Missing required value for the field 'Full Name'!</span> :''}

                                </Typography>
                            </Grid>

                            <Grid class="form-group col-md-6">
                                <Typography sx={{ fontSize: 16 }} gutterBottom >
                                    <h4> General Overview About Yourself </h4>
                                </Typography>
                                <Typography variant="body2">
                                    <TextField
                                        rows={5}
                                        multiline
                                        id="about-textfield"
                                        variant="outlined"
                                        value={readProfile.about}
                                        sx={{ width: 750 }}
                                        onChange={(e) => {
                                            setReadProfile({
                                                ...readProfile,
                                                about: e.target.value,
                                            })
                                        }}
                                        disabled={!openField}
                                    />
                                    <br />{validate.about? <span style={errorMessage}>Missing required value for the field 'General Overview about Yourself'!</span> :''}

                                </Typography>
                            </Grid>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Contact Number </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    id="noTelp-textfield"
                                    variant="outlined"
                                    value={readProfile.noTelp}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            noTelp: e.target.value,
                                        })
                                    }}
                                    disabled={!openField}
                                />
                                <br />{validate.noTelp? <span style={errorMessage}>Missing required value for the field 'Contact Number'!</span> :''}
                            </Typography>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Date of Birth </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    type="date"
                                    id="dateOfBirth-textfield"
                                    variant="outlined"
                                    value={readProfile.dateOfBirth}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            dateOfBirth: e.target.value,
                                        })
                                    }}
                                    disabled={!openField}
                                />
                                <br />{validate.dateOfBirth? <span style={errorMessage}>Missing required value for the field 'Date of Birth'!</span> :''}
                            </Typography>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Years of Experience </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    id="yearExperience-textfield"
                                    variant="outlined"
                                    value={readProfile.yearExperience}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            yearExperience: e.target.value,
                                        })
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Year</InputAdornment>,
                                    }}
                                    disabled={!openField}
                                />
                                <br />{validate.yearExperience? <span style={errorMessage}>{validate.yearExperience}</span> :''}
                            </Typography>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Current Salary </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    id="currentSalary-textfield"
                                    variant="outlined"
                                    value={readProfile.currentSalary}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            currentSalary: e.target.value,
                                        })
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="end">IDR</InputAdornment>,
                                    }}
                                    disabled={!openField}
                                />
                                <br />{validate.currentSalary? <span style={errorMessage}>{validate.currentSalary}</span> :''}
                            </Typography>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Industry </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    id="industry-textfield"
                                    variant="outlined"
                                    value={readProfile.industry}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            industry: e.target.value,
                                        })
                                    }}
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}

                                    disabled={!openField}
                                >{industryList.map((option)=>(
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}</TextField>
                                <br />{validate.industry? <span style={errorMessage}>Missing required value for the field 'Industry'!</span> :''}
                            </Typography>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Job Level </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    id="jobLevel-textfield"
                                    variant="outlined"
                                    value={readProfile.jobLevel}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            jobLevel: e.target.value,
                                        })
                                    }}
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}

                                    disabled={!openField}
                                >{jobTitles.map((option)=>(
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}</TextField>
                                <br />{validate.jobLevel? <span style={errorMessage}>Missing required value for the field 'Job Level'!</span> :''}
                            </Typography>

                            <Typography sx={{ fontSize: 16 }} gutterBottom >
                                <h4> Job Position </h4>
                            </Typography>
                            <Typography variant="body2">
                                <TextField
                                    id="jobPosition-textfield"
                                    variant="outlined"
                                    value={readProfile.jobPosition}
                                    sx={{ width: 750 }}
                                    onChange={(e) => {
                                        setReadProfile({
                                            ...readProfile,
                                            jobPosition: e.target.value,
                                        })
                                    }}
                                    disabled={!openField}
                                />
                                <br />{validate.jobPosition? <span style={errorMessage}>Missing required value for the field 'Job Position'!</span> :''}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ minWidth: 1000, margin: 2, maxWidth: 600 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                <b>Curriculum Vitae</b>
                            </Typography>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom >
                                Your CV should have education and work experience section. For education, state the Year, Degree, and Major.
                                For work experience, start with the present one and state your roles and responsibilities.
                            </Typography>

                            <Grid justifyContent="flex-end" margin={2}>
                                <Button onClick={selectFile} disabled={!openField} variant="contained"><AttachFileIcon />  Update CV </Button>
                                &nbsp;&nbsp;
                                <Button onClick={viewFile} variant="contained"><RemoveRedEyeIcon />  View and Download CV</Button>
                                <input type='file' accept='.pdf' multiple={false} id='file' style={{display:'none'}}></input>
                            </Grid>
                        </CardContent>
                    </Card>

                </Container>
            </Box>
        </>
    );
}


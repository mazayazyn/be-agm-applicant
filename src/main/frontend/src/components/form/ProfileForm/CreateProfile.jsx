import React, { useEffect, useState } from 'react';
import {Button, Container, Grid, Typography} from '@mui/material';
import {Box, MenuItem, Paper} from "@material-ui/core";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import uploadService from "../../../services/upload-service";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import profileService from "../../../services/profile-service";
import InputAdornment from "@mui/material/InputAdornment";
import AuthService from "../../../services/auth.service";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

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

export default function CreateProfile(props) {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [validate, setValidate]=useState({})

    const[fullName,setFullName]=useState('')
    const[noTelp,setNoTelp]=useState('')
    const[about,setAbout]=useState('')
    const[appliedStatus,setAppliedStatus]=useState('')
    const[currentSalary,setCurrentSalary]=useState('')
    const[dateOfBirth,setDateOfBirth]=useState('')
    const[jobLevel,setJobLevel]=useState('')
    const[jobPosition,setJobPosition]=useState('')
    const[yearExperience,setYearExperience]=useState('')
    const[industry,setIndustry]=useState('')

    const[cvFileName,setCvFileName]=useState('')
    const[cvPhoto,setCvPhoto]=useState('')
    const[uploaded, setUploaded]=useState(false)
    const[uploadedImage, setUploadedImage]=useState(false)

    const [errorFile, setErrorFile] = useState(false)
    const [errorDescription, setErrorDescription] = useState('')

    const [errorImage, setErrorImage] = useState(false)
    const [errorDescriptionImage, setErrorDescriptionImage] = useState('')

    const[id, setId]=useState(0)

    useEffect(async() => {
        let user = await profileService.getUserEmail()
        setId(user.data.data.id)
        // console.log(user.data);
    }, [])

    const classes = useStyles();

    const handleClick= async(e)=> {
        e.preventDefault()
        setValidate({})
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
        if (!industry){
            setValidate({jobLevel: true})
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
            if(!currentSalary.match(/^[0-9]+$/)){
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
        const candidate = {fullName, noTelp, about, appliedStatus, currentSalary, dateOfBirth, jobLevel, jobPosition, yearExperience, cvFileName, industry, cvPhoto}
        await profileService.createProfile(candidate, id)
        window.location.href="/profile";
    }

    const errorMessage = {
        color: 'red',
        fontSize: '12px',
        fontWeight: 'bold'
    };

    const selectFile=(e)=> {
        setErrorFile(false)
        setErrorDescription('')
        e.preventDefault()
        let inputFile = document.getElementById('file')
        inputFile.onchange = async(x)=> {
            let file = x.target.files[0]
            let data = await uploadService.uploadFile(file)
            // console.log(data)
            if(data.data.error=='true'){
                setErrorFile(true)
                setErrorDescription(data.data.errorDescription)
                return
            }
            // console.log(data.data.fileName)
            setCvFileName(data.data.fileName)
            setUploaded(true)
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
            setCvPhoto(data.data.fileName)
            setUploadedImage(true)
            x.target.value = null
        }
        inputFile.click()
    }

    const viewFile=(e)=> {
        uploadService.viewFile(cvFileName)
    }

    const viewImage=(e)=> {
        uploadService.viewFile(cvPhoto)
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
        <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            py="10vh"
        >
            <Container  align="center" >
                <Paper elevation={3} style={paperStyle}>
                    <Typography style={{ fontWeight: "bold" }} variant = "h5">Personal Details</Typography>
                    <Typography
                        color="#454ADE"
                        sx={{ fontWeight: 'bold', fontSize: 24 }}
                    >
                        {username}
                    </Typography>
                    <Typography variant = "h7">{email}</Typography>
                    <p><br></br></p>

                    <form className = {classes.root} autoComplete="off">
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Full Name* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={fullName}
                                   required
                                   onChange={(e)=>setFullName(e.target.value)}
                        />{validate.fullName? <span style={errorMessage}>Missing required value for the field 'Full Name'!</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Contact Number* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={noTelp}
                                   required
                                   onChange={(e)=>setNoTelp(e.target.value)}
                        />{validate.noTelp? <span style={errorMessage}>Missing required value for the field 'Contact Number'!</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> General Overview about Yourself* </h4>
                        </Typography>
                        <TextField id="outlined-basic"  variant="outlined" fullWidth
                                   rows={5}
                                   multiline
                                   value={about}
                                   required
                                   onChange={(e)=>setAbout(e.target.value)}
                        />{validate.about? <span style={errorMessage}>Missing required value for the field 'General Overview about Yourself'!</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Industry* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={industry}
                                   required
                                   select
                                   SelectProps={{
                                       native: false,
                                   }}
                                   onChange={(e)=>setIndustry(e.target.value)}
                        >
                            {industryList.map((option)=>(
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>{validate.industry? <span style={errorMessage}>Missing required value for the field 'Industry'!</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Job Level* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={jobLevel}
                                   required
                                   select
                                   SelectProps={{
                                       native: false,
                                   }}
                                   onChange={(e)=>setJobLevel(e.target.value)}
                        >
                            {jobTitles.map((option)=>(
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>{validate.jobLevel? <span style={errorMessage}>Missing required value for the field 'Job Level'!</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Job Position* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={jobPosition}
                                   required
                                   onChange={(e)=>setJobPosition(e.target.value)}
                        />{validate.jobPosition? <span style={errorMessage}>Missing required value for the field 'Job Position'!</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Years of Experience* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={yearExperience}
                                   required
                                   InputProps={{
                                       endAdornment: <InputAdornment position="end">Year</InputAdornment>,
                                   }}
                                   onChange={(e)=>setYearExperience(e.target.value)}
                        />{validate.yearExperience? <span style={errorMessage}>{validate.yearExperience}</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Current Salary* </h4>
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" fullWidth
                                   value={currentSalary}
                                   required
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">IDR</InputAdornment>,
                                   }}
                                   onChange={(e)=>setCurrentSalary(e.target.value)}
                        />{validate.currentSalary? <span style={errorMessage}>{validate.currentSalary}</span> :''}

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                            <h4> Date of Birth* </h4>
                        </Typography>
                        <TextField type="date" id="outlined-basic-uncontrolled" variant="outlined" fullWidth
                                   value={dateOfBirth}
                                   required
                                   onChange={(e)=>setDateOfBirth(e.target.value)}
                        />{validate.dateOfBirth? <span style={errorMessage}>Missing required value for the field 'Date of Birth!</span> :''}
                        <p><br></br></p>

                        <Grid justifyContent="flex-end" margin={2}>
                            <Typography variant="h5" component="div" gutterBottom>
                                <b>Curriculum Vitae*</b>
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" margin={2} >
                                Your CV should have education and work experience section. For education, state the Year, Degree, and Major.
                                For work experience, start with the present one and state your roles and responsibilities.
                            </Typography>
                            <Button onClick={selectFile} variant="contained" gutterBottom><AttachFileIcon /> Upload CV </Button>
                            &nbsp;&nbsp;
                            {uploaded? <Button onClick={viewFile} variant="contained"> View Uploaded CV </Button>:''}
                            <input type='file' accept='.pdf' multiple={false} id='file' style={{display:'none'}}></input>
                            <br />{validate.cvFileName? <span style={errorMessage}>Missing required value for the field 'CV'!</span> :''}
                        </Grid>
                        <p><br></br></p>
                        <Grid justifyContent="flex-end" margin={2}>
                            <Typography variant="h5" component="div" gutterBottom>
                                <b>Photos*</b>
                            </Typography>
                            <Button onClick={selectImage} variant="contained" sx={{ backgroundColor:'#233C67!important' }}><AttachFileIcon /> Upload Photo </Button>
                            &nbsp;&nbsp;
                            {uploadedImage? <Button onClick={viewImage} variant="contained"> View Uploaded Photo </Button>:''}
                            <input type='file' accept='.png, .jpeg, .jpg' multiple={false} id='file2' style={{display:'none'}}></input>
                            <br />{validate.cvPhoto? <span style={errorMessage}>Missing required value for the field 'Photo'!</span> :''}
                        </Grid>

                        <p><br></br></p>
                        <p><br></br></p>
                        <Button variant="contained" onClick={handleClick} align="center">
                            Save
                        </Button>

                    </form>
                </Paper>
            </Container>

        </Box>

    )
}



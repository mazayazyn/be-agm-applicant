import {
    Button,
    Grid,
    TextField,
    Typography,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl,
    Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {useRef} from "react";
import Logo from '../../../assets/auth/Logo.png'
import classes from '../../../styles/auth.module.css'
import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Form from "react-validation/build/form";
import AuthService from "../../../services/auth.service"
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Signin = (props) => {
    const form = useRef();
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigateToIndex = () => {
        let email = AuthService.getCurrentEmail()
        let role = AuthService.getCurrentRole()
        return axios({
          method: 'get',
          url: '/api/user/getUserByEmail/' + email,
          headers: {
              'content-type': 'application/json'
          }
        }).then(
          (response) => {
            if(role === "HR" || role === "KLIEN") {
              navigate("/home")
            } else if(response.data.status === "404"){
              console.log("candidate not found");
              navigate("/profile")
            } else {
              console.log("candidate found");
              navigate("/home")
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        AuthService.login(values.email, values.password).then(
            () => {
                setMessage("Login Successful")
                setOpen(true);
                window.setTimeout(navigateToIndex, 3000);
            },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
                setMessage("Invalid email or password, try it again!")
                setOpenError(true);
            }
        );
    };

    return (
        <Grid container className={classes.background} minHeight={"100vh"} alignItems="center">
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
            <Grid item xs={12} md={4} className={classes.box}>
                <Grid xs={12}>
                    <Grid item mb={3}>
                        <img src={Logo}></img>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h4" mb={5} xs={12} textAlign="center" fontWeight={"bold"}>
                            Sign In
                        </Typography>
                    </Grid>
                    <Form onSubmit={handleLogin} ref={form}>
                        <Grid item xs={12}>
                            <TextField required id="outlined" label="Email" className={classes.textField} onChange={handleChange('email')} autoComplete="off"/>
                        </Grid>
                        <br></br>
                        <Grid item xs={12}>
                            <FormControl className={classes.textField}>
                                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                                <OutlinedInput
                                    required
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    label="password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} mt={5}>
                            <Button type="submit" variant="contained" className={classes.submit}>Sign In</Button>
                        </Grid>
                    </Form>
                    <Grid xs={12} mt={5}>
                        <p>Don’t have an account? <a href="/signup"><span><b>Sign Up Here</b></span></a></p>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Signin;


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
    Snackbar,
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
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const form = useRef();
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
      username: '',
      email:'',
      password: '',
      repeatPassword:'',
      showPassword: false,
      showRepeatPassword: false
    });

    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [successful, setSuccessful] = React.useState(false);
    
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const AlertError = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangeRepeat = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
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
    
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };

    const handleClickShowRepeatPassword = () => {
      setValues({
        ...values,
        showRepeatPassword: !values.showRepeatPassword,
      });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMouseDownRepeatPassword = (event) => {
      event.preventDefault();
    };

    const navigateToLogin = () => {
      navigate("/signin");
    }

    const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      setSuccessful(false);
  
      form.current.validateAll();
  
      if (values.password === values.repeatPassword) {
        AuthService.register(values.username, values.email, values.password).then(
          (response) => {
            if (response.data.status != 400) {
              setOpen(true);
              setMessage("Sign Up Successful, you can signin now.");
              setSuccessful(true);
              window.setTimeout(navigateToLogin, 3000);
            } else {
              console.log(response)
              setMessage("email has been registered, use another email to Signup")
              setOpenError(true);
            }
          },
          (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setOpenError(true);
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } else {
        setOpenError(true);
      }
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
                Sign Up
              </Typography>
            </Grid>
            <Form onSubmit={handleRegister} ref={form}>
              <Grid item xs={12}>
                <TextField required id="outlined" label="Username" className={classes.textField} onChange={handleChange('username')} autoComplete="off"/>
              </Grid>
              <Grid item xs={12} mt={4}>
                <TextField required id="outlined" label="Email" className={classes.textField} onChange={handleChange('email')} autoComplete="off"/>
              </Grid>
              <Grid item xs={12} mt={4}>
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
              <Grid item xs={12} mt={4}>
                  <FormControl className={classes.textField}>
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password *</InputLabel>
                  <OutlinedInput
                      required
                      id="outlined-adornment-password"
                      type={values.showRepeatPassword ? 'text' : 'password'}
                      value={values.repeatPassword}
                      onChange={handleChangeRepeat('repeatPassword')}
                      label="Confirm Password"
                      endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRepeatPassword}
                          onMouseDown={handleMouseDownRepeatPassword}
                          edge="end"
                          >
                          {values.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      </InputAdornment>
                      }
                  />
                  </FormControl>
              </Grid>
              <Grid xs={12} mt={5}>
                <Button type="submit" variant="contained" className={classes.submit}>Sign Up</Button>
              </Grid>
            </Form>
            <Grid xs={12} mt={5}>
                <p>Already have an account? <a href="/signin"><span><b>Sign In Now</b></span></a></p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  
  export default Signup;
  
import {Snackbar, Button, ThemeProvider, Typography, Box, Card, CardActions, CardContent, Grid} from "@mui/material";
import AuthService from "../services/auth.service"
import {Link, useNavigate} from "react-router-dom"
import React, {useEffect} from "react"
import jwtDecode from "jwt-decode";
import MuiAlert from '@mui/material/Alert';
import Styles from '../styles/index.module.css';
import Classes from '../styles/svg.module.css';
import Landing from '../assets/landing/Hero.png'
import Right from '../assets/landing/right.png'
import Container from '@material-ui/core/Container';
import theme from '../theme/Theme';
import AGMLogo from '../assets/landing/FullLogoPrimary.png';
import AGMProduct from '../assets/landing/FullProductPrimary.png';
import axios from "axios";

//import all logos
import sgs from '../assets/landing/client/sgs.png';
import neptune from '../assets/landing/client/neptune.png';
import gdf from '../assets/landing/client/gdf.png';
import wavin from '../assets/landing/client/wavin.png';
import djabesmen from '../assets/landing/client/djabesmen.png';
import holcim from '../assets/landing/client/holcim.png';
import swisstime from '../assets/landing/client/swisstime.png';
import fonterra from '../assets/landing/client/fonterra.png';
import frisianflag from '../assets/landing/client/frisianflag.png';
import schott from '../assets/landing/client/schott.png';
import app from '../assets/landing/client/app.png';
import premieroil from '../assets/landing/client/premieroil.png';
import charoen from '../assets/landing/client/charoen.png';
import mandiri from '../assets/landing/client/mandiri.png';
import worldbank from '../assets/landing/client/worldbank.png';
import carrefour from '../assets/landing/client/carrefour.png';
import globalfinance from '../assets/landing/client/globalfinance.png';
import abm from '../assets/landing/client/abm.png';
import cocacola from '../assets/landing/client/cocacola.png';
import piaggio from '../assets/landing/client/piaggio.png';
import kangean from '../assets/landing/client/kangean.png';
import maersk from '../assets/landing/client/maersk.png';
import billabong from '../assets/landing/client/billabong.png';
import mazars from '../assets/landing/client/mazars.png';
import garuda from '../assets/landing/client/garuda-1.png';
import astra from '../assets/landing/client/astra.png';
import honeylady from '../assets/landing/client/honeylady.png';
import oriflame from '../assets/landing/client/oriflame.png';
import beirsdorf from '../assets/landing/client/beiersdorf.png';
import bluescope from '../assets/landing/client/bluescope.png';
import epson from '../assets/landing/client/epson.png';

function Index() {

    const [email, setEmail] = React.useState();
    const [role, setRole] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [token, setToken] = React.useState();
    const [vacancies, setVacancies] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const emails = AuthService.getCurrentEmail();
      const roles = AuthService.getUsername();
      setEmail(emails);
      setRole(roles);
    }, []);

    useEffect(() => {
      axios.get("api/list-vacancy").
      then(res => {
          // console.log(res.data)
          setVacancies(res.data.result.slice(0,4))
      })
          .catch(err => {
              console.log(err)
          })
    }, [])

    const handleLogout = () => {
      const logout_trigger = AuthService.logout();
      if(logout_trigger){
        setMessage("Logout Successful")
        setOpen(true);
        window.setTimeout(navigateToSigin, 3000);
      }
    }
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const navigateToSigin = () => {
      navigate("/signin");
      window.reload.page();
    }

    const handleClick=(e)=> {
        e.preventDefault()
        const newField = {
            candidateName: '',
            noTelp: '',
            about: '',
            appliedStatus: '',
            currentSalary: '',
            dateOfBirth: '',
            jobLevel: '',
            jobPosition: '',
            yearExperience: '',

            experienceTemp: '',
            educationTemp: '',
            skillTemp: '',
            industryTemp: ''
        }

    }

    var cont=0;
    function loopSlider(){
      var xx= setInterval(function(){
        switch(cont)
        {
        case 0:{
            $("#slider-1").fadeOut(400);
            $("#slider-2").delay(400).fadeIn(400);
            cont=1;
            break;
        }
        
        case 1: {
            $("#slider-2").fadeOut(400);
            $("#slider-3").delay(400).fadeIn(400);
            cont=2;
            break;
        }

        case 2:{
          $("#slider-3").fadeOut(400);
          $("#slider-4").delay(400).fadeIn(400);
          cont=3;
          break;
        }

        case 3:{
          $("#slider-4").fadeOut(400);
          $("#slider-5").delay(400).fadeIn(400);
          cont=4;
          break;
        }
        case 4:{
          $("#slider-5").fadeOut(400);
          $("#slider-6").delay(400).fadeIn(400);
          cont=5;
          break;
        }
        case 5:{
          $("#slider-6").fadeOut(400);
          $("#slider-7").delay(400).fadeIn(400);
          cont=6;
          break;
        }

        case 6:{
          $("#slider-7").fadeOut(400);
          $("#slider-1").delay(400).fadeIn(400);
          cont=0;
          break;
        }
        
        }},4000);

    }

    function reinitLoop(time){
      clearInterval(xx);
      setTimeout(loopSlider(),time);
    }

      $(window).ready(function(){
        $("#slider-2").hide();
        $("#slider-3").hide();
        $("#slider-4").hide();
        $("#slider-5").hide();
        $("#slider-6").hide();
        $("#slider-7").hide();
        loopSlider();
    });

    return (
      <ThemeProvider theme={theme}>
        <Box className={Styles.hero}>
          <Container>
            <Box sx={{height:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Box sx={{my:2}}>
                <Box sx={{my:4}}>
                  <Typography variant='h1' fontSize={{xs:'32px', md:'56px'}} sx={{textAlign:'center', color:'#FFFFFF', fontWeight:'bold'}} data-aos="fade-up">
                    Headhunters Job Street
                  </Typography>
                  <Typography variant='subtitle2' sx={{textAlign:'center', mt:4, color:'#FFFFFF', fontWeight:'400', lineHeight:'35px'}}>
                    AGM Applicant is a place to find jobs according to your field and interests, <br></br>you can choose from many jobs that are available here!
                  </Typography>
                </Box>
                <Box display={{xs:'block', md:'flex'}} sx={{justifyContent:'center'}}>
                  {/*<Box sx={{mx:{sx:0,md:2}, my:{xs:2,md:0}}}>*/}
                  {/*  <Button variant="contained" sx={{backgroundColor:'#141414!important', borderRadius:'8px', width:'100%', padding:'12px 32px', textTransform:'capitalize'}}>Get Started Now</Button>*/}
                  {/*</Box>*/}
                  <Box>
                    <Button href="/job-list" variant="outline" sx={{borderRadius:'8px', padding:'10px 32px', width:'100%', textTransform:'capitalize', color:'#FFFFFF', border:'solid 1px #ffffff'}}>Explore</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box sx={{my:12}}>
          <Container>
            <Box sx={{padding:'5px 20px', backgroundColor:'#141414', color:'white', borderRadius:'15px', width:'70px'}}>
              About Us
            </Box>
            <Box display={{xs:'block', md:'flex'}} sx={{mt:5}}>
              <Box width={{xs:'100%', md:'45%'}}>
                <Box sx={{display:'flex', justifyContent:'center', overflow:'hidden', padding:'40% 15%', backgroundColor:'#454ADE', borderRadius:'12px', mr:{xs:0,md:5}}}>
                  <Box>
                    <img src={AGMLogo} className={Styles.logoimg}></img>
                  </Box>
                </Box>
              </Box>
              <Box width={{xs:'100%', md:'60%'}}>
                <Typography variant='h3' sx={{my:3, color:'#454ADE'}}>
                How About AGM Consultant?
                </Typography>
                <Typography sx={{textAlign:'justify'}}>
                <b>Azhari Global Mandiri</b> was established in 2009 under the name Azhari Consulting. Our business is management consulting company that helps entrepreneurs, business owners, and company leaders to maximize all business management performance, design and map the right business strategy; and ultimately can improve the company's financial performance on an ongoing basis.
                <br></br><br></br>We and our company select only top professionals using innovative, best practice and most applicable approaches which identify and highlight capacities and skills. Our variety of client range from financial institution, real estate & property development, oil-gas-mining and energy, automotive & heavy equipment, food & beverage, chemicals & pharmaceuticals, hospitality industry (hotel/restaurant/café), cosmetics & beauty care, retail & distribution to information technology industry, and many more.
                </Typography> <br></br>
                {/* <Button variant="outline" sx={{borderRadius:'8px', padding:'12px 32px', width:'100%', backgroundColor:'rgba(69,74,222,0.1)!important', textTransform:'capitalize', color:'rgba(69,74,222,1)!important'}}>See More</Button> */}
              </Box>
            </Box>
            {/* <Box sx={{display:'flex', justifyContent:'center', my:3}}>
              <Box sx={{my:4}}>
                <Button variant="outline" sx={{borderRadius:'8px', padding:'12px 32px', width:'100%', backgroundColor:'rgba(69,74,222,0.1)!important', textTransform:'capitalize', color:'rgba(69,74,222,1)!important'}}>See More</Button>
              </Box>
            </Box> */}
          </Container>
        </Box>
        <Box sx={{my:12}} className={Styles.vacancies}>
          <Box sx={{paddingTop:'10%',paddingBottom:'10%'}}>
          <Container>
            <Box sx={{padding:'5px 20px', backgroundColor:'#141414', color:'white', borderRadius:'15px', width:'70px'}}>
              Vacancies
            </Box>
            <Typography variant='h3' sx={{my:3, color:'white'}}>
              Apply Job Vacancy that you want!
            </Typography>
            <Box sx={{display:{xs:'block', md:'flex'}}}>
              {vacancies.map(function (vacancy, index){
                  return (
                    <Card sx={{ minWidth: 275, borderRadius:'8px', boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)", my:4, px:2, py:2, marginRight:{md:'1%'}, width:{xs:'100%', md:'20%'}, backgroundColor:'#FFFFFF'}}>
                    <CardContent>
                      <Typography variant="h3" color='#233C67'>
                        {vacancy.title}
                      </Typography>
                      <Typography sx={{ fontSize: 14, mt:1 }} color="#233C67" gutterBottom>
                        {vacancy.industry}
                      </Typography>
                    </CardContent>
                    {/*<CardActions>*/}
                    {/*  <Button size="small" sx={{color:'#454ADE', textTransform:'capitalize'}} onClick={() => { navigate("/candidate-detail/" + item.id + "/" + props.props); }}>Apply Now &nbsp;&nbsp; ➔</Button>*/}
                    {/*</CardActions>*/}
                  </Card>
                  )
              })}
            </Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Box sx={{my:4}}>
                <Button href="/job-list" variant="outline" sx={{borderRadius:'8px', padding:'12px 32px', width:'100%', backgroundColor:'rgba(255,255,255,0.1)!important', textTransform:'capitalize', color:'#FFFFFF!important'}}>See More</Button>
              </Box>
            </Box>
          </Container>
        </Box>
        </Box>
        <Box sx={{my:24}}>
          <Container>
            <Box sx={{padding:'5px 20px', backgroundColor:'#141414', color:'white', borderRadius:'15px', width:'50px'}}>
                Clients
            </Box>
            <Typography variant='h3' sx={{my:3, color:'#141414'}}>
              They Trust our Services
            </Typography>
            <Typography variant='subtitle2' sx={{my:3, color:'#141414'}}>
              More than 30+ clients using our services
            </Typography>
            <Box sx={{my:6}}>
              <Box id='slider-1' sx={{display:{xs:'block', md:'flex'}}}>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={sgs} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={neptune} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={gdf} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={wavin} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={djabesmen} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
              <Box id='slider-2' sx={{display:{xs:'block', md:'flex'}}}>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={holcim} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={oriflame} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={swisstime} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={fonterra} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={frisianflag} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
              <Box id='slider-3' sx={{display:{xs:'block', md:'flex'}}}>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={schott} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={app} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={beirsdorf} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={bluescope} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={premieroil} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
              <Box id='slider-4' sx={{display:{xs:'block', md:'flex'}}}>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={charoen} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={epson} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={mandiri} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={worldbank} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={carrefour} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
              <Box id='slider-5' sx={{display:{xs:'block', md:'flex'}}}>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={globalfinance} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={abm} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={cocacola} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={piaggio} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={kangean} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
              <Box id='slider-6' sx={{display:{xs:'block', md:'flex'}}}>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={maersk} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={billabong} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={mazars} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={garuda} style={{width:'100%'}}></img>
                </Grid>
                <Grid item xs={2}>
                <img src={astra} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
              <Box id='slider-7'>
              <Grid container spacing={4} sx={{justifyContent:'space-between'}}>
                <Grid item xs={2}>
                  <img src={honeylady} style={{width:'100%'}}></img>
                </Grid>
              </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box sx={{my:12}}>
          {/*<Container>*/}
          {/*  <Box sx={{backgroundColor:'#F7F8F9', borderRadius:'60px', padding:'5% 5%', justifyContent:'space-between'}} display={{xs:'block', md:'flex'}}>*/}
          {/*    <Box>*/}
          {/*      <Typography variant='h3' sx={{color:'#454ADE'}}>*/}
          {/*        What are you waiting for?*/}
          {/*      </Typography>*/}
          {/*      <Typography sx={{mt:1}}>*/}
          {/*        Sign up now and apply vacancy that you interest with*/}
          {/*      </Typography>*/}
          {/*    </Box>*/}
          {/*    <Box sx={{display:'flex', alignItems:'center'}}>*/}
          {/*      <Box>*/}
          {/*        <Button variant="contained" sx={{backgroundColor:'#141414!important', borderRadius:'90px', width:'100%', padding:'12px 32px', textTransform:'capitalize'}}>*/}
          {/*          Sign up Now &nbsp;&nbsp; ➔*/}
          {/*        </Button>*/}
          {/*      </Box>*/}
          {/*    </Box>*/}
          {/*  </Box>*/}
          {/*</Container>*/}
        </Box>
        <Box sx={{my:8}}>
          <Container>
            <hr></hr>
          </Container>
        </Box>
        <Box sx={{my:4, backgroundColor:''}}>
          <Container>
            <Box sx={{display:{xs:'block', md:'flex'}, justifyContent:'space-between'}}>
              <Box sx={{width:{xs:'100%', md:'50%'}}}>
                <img src={AGMProduct} style={{width:'40%'}}></img>
                <Typography variant='subtitle1' sx={{fontSize:'16px', mt:1}}>
                The CEO Building Level 12 Jl. TB Simatupang No.18C <br></br>Jakarta Selatan, DKI Jakarta. 12430 Indonesia
                </Typography>
                <Typography sx={{mt:1}}>
                  Phone : +62 21 29557239
                </Typography>
              </Box>
              <Box>
                <Box sx={{my:2, textAlign:'right'}}>
                  <Typography sx={{fontWeight:'bold', color:'#454ADE'}}>
                    Menu
                  </Typography>
                  <Typography sx={{color:'#141414!important', my:1}}>
                    Vacancy
                  </Typography>
                  <Typography sx={{color:'#141414!important', my:1}}>
                    About Us
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{my:4, textAlign:'center', fontSize:'14px'}}>
              Azhari Global Mandiri Consultant © 2022 - Hak Cipta Dilindungi Undang-Undang
            </Box>
          </Container>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        {/* <h1>Hello, {email}</h1>
        <h4>you have role to {role}</h4>
        <Button variant="contained" onClick={handleLogout}>Log Out</Button>
          <Button variant="contained" onClick={handleClick} >
              <Link to = {
                  {
                      pathname : `/profile`,
                  }
              }>Profile</Link>
        </Button> */}
      </ThemeProvider>
    );
}

export default Index;

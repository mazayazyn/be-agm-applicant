import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import navLogo from "../../assets/nav/PrimaryLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AdbIcon from "@mui/icons-material/Adb";
import Classes from "../../styles/index.module.css";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircle from "@mui/icons-material/AccountCircle";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Dashboard", "Logout"];

const Navbar = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [randomNumber, setRandomNumber] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [vacancies, setVacancies] = React.useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const emails = AuthService.getCurrentEmail();
    AuthService.getUsername();
    setName(localStorage.getItem("username"));
    setEmail(emails);
  }, [randomNumber]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setName("");
    localStorage.removeItem("username");
    const logout_trigger = AuthService.logout();
    if (logout_trigger) {
      window.setTimeout(navigateToSigin, 3000);
    }
  };

  const navigateToSigin = () => {
    navigate("/signin");
    window.reload.page();
  };

  const roles = AuthService.getCurrentRole();

  return (
      <>
        {roles === "" ? (
            <Container>
              <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    color: "#141414",
                  }}
              >
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <img src={navLogo} className={Classes.navImg} />
                    <Box
                        sx={{ flexGrow: 0.2, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                      >
                        {/*<MenuItem*/}
                        {/*    onClick={() => {*/}
                        {/*      navigate("/vacancies-form");*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*  Request Vacancies*/}
                        {/*</MenuItem>*/}
                      </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        no
                        rap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,
                          display: { xs: "flex", md: "none" },
                          flexGrow: 1,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                    >
                      <img src={navLogo} className={Classes.navImgMobile} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                      {/*<MenuItem*/}
                      {/*    onClick={() => {*/}
                      {/*      navigate("/vacancies");*/}
                      {/*    }}*/}
                      {/*>*/}
                      {/*  <Typography variant="subtitle1" color="text.primary">*/}
                      {/*    About Us*/}
                      {/*  </Typography>*/}
                      {/*</MenuItem>*/}
                      {/*<MenuItem*/}
                      {/*    onClick={() => {*/}
                      {/*      navigate("/vacancies");*/}
                      {/*    }}*/}
                      {/*>*/}
                      {/*  <Typography variant="subtitle1" color="text.primary">*/}
                      {/*    Vacancies*/}
                      {/*  </Typography>*/}
                      {/*</MenuItem>*/}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Box sx={{ mx: 1 }}>
                          <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#141414!important",
                                borderRadius: "8px",
                                width: "100%",
                                padding: "6px 16px",
                                textTransform: "capitalize",
                              }}
                              onClick={() => {
                                navigate("/signup");
                              }}
                          >
                            Sign Up
                          </Button>
                        </Box>
                        <Box sx={{ mx: 1 }}>
                          <Button
                              variant="outline"
                              sx={{
                                borderRadius: "8px",
                                width: "100%",
                                padding: "6px 16px",
                                textTransform: "capitalize",
                              }}
                              onClick={() => {
                                navigate("/signin");
                              }}
                          >
                            Sign In
                          </Button>
                        </Box>
                      </Box>
                      <Box
                          sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}
                      >
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Box>
                              <LoginIcon sx={{ color: "#141414" }}></LoginIcon>
                            </Box>
                          </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                          <MenuItem
                              onClick={() => {
                                navigate("/signup");
                              }}
                          >
                            <Typography variant="subtitle1" color="text.primary">
                              Sign Up
                            </Typography>
                          </MenuItem>
                          <MenuItem
                              onClick={() => {
                                navigate("/signin");
                              }}
                          >
                            <Typography variant="subtitle1" color="text.primary">
                              Sign In
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Container>
        ) : roles === "KANDIDAT" ? (
            <Container>
              <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    color: "#141414",
                  }}
              >
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <img src={navLogo} className={Classes.navImg} />
                    <Box
                        sx={{ flexGrow: 0.2, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                      >
                        <MenuItem
                            onClick={() => {
                              navigate("/home");
                            }}
                        >
                          Home
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                              navigate("/job-list");
                            }}
                        >
                          Explore Vacancies
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                              navigate("/status-applicant");
                            }}
                        >
                          Applied Vacancies
                        </MenuItem>
                        {/*<MenuItem onClick={() => { navigate("/home")}}>Notifications</MenuItem>*/}
                      </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        no
                        rap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,
                          display: { xs: "flex", md: "none" },
                          flexGrow: 1,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                    >
                      <img src={navLogo} className={Classes.navImgMobile} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                      <MenuItem
                          onClick={() => {
                            navigate("/home");
                          }}
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                          onClick={() => {
                            navigate("/job-list");
                          }}
                      >
                        Explore Vacancies
                      </MenuItem>
                      <MenuItem
                          onClick={() => {
                            navigate("/status-applicant");
                          }}
                      >
                        Applied Vacancies
                      </MenuItem>
                      {/*<MenuItem onClick={() => { navigate("/home")}}>Notifications</MenuItem>*/}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: { sx: "none", md: "flex" }, mt: 1.5 }}>
                          {name}
                        </Box>
                        <Box>
                          <IconButton
                              size="large"
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                          <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                          >
                            <MenuItem
                                onClick={() => {
                                  navigate("/profile");
                                }}
                            >
                              Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Container>
        ) : roles === "KLIEN" ? (
            <Container>
              <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    color: "#141414",
                  }}
              >
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <img src={navLogo} className={Classes.navImg} />
                    <Box
                        sx={{ flexGrow: 0.2, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                      >
                        <MenuItem
                            onClick={() => {
                              navigate("/home");
                            }}
                        >
                          Home
                        </MenuItem>
                        {/* <MenuItem onClick={() => { navigate("/vacancies-form")}}>Request Vacancies</MenuItem> */}
                        <MenuItem
                            onClick={() => {
                              navigate("/dashboard");
                            }}
                        >
                          Dashboard
                        </MenuItem>
                      </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        no
                        rap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,
                          display: { xs: "flex", md: "none" },
                          flexGrow: 1,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                    >
                      <img src={navLogo} className={Classes.navImgMobile} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                      <MenuItem
                          onClick={() => {
                            navigate("/home");
                          }}
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                      >
                        Dashboard
                      </MenuItem>
                      {/*<MenuItem*/}
                      {/*    onClick={() => {*/}
                      {/*      navigate("/vacancies-form");*/}
                      {/*    }}*/}
                      {/*>*/}
                      {/*  Request Vacancies*/}
                      {/*</MenuItem>*/}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: { sx: "none", md: "flex" }, mt: 1.5 }}>
                          {name}
                        </Box>
                        <Box>
                          <IconButton
                              size="large"
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                          <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                          >
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                      <Box
                          sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}
                      >
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                          <MenuItem
                              onClick={() => {
                                navigate("/signup");
                              }}
                          >
                            <Typography variant="subtitle1" color="text.primary">
                              Sign Up
                            </Typography>
                          </MenuItem>
                          <MenuItem
                              onClick={() => {
                                navigate("/signin");
                              }}
                          >
                            <Typography variant="subtitle1" color="text.primary">
                              Sign In
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Container>
        ) : roles === "HR" ? (
            <Container>
              <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    color: "#141414",
                  }}
              >
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <img src={navLogo} className={Classes.navImg} />
                    <Box
                        sx={{ flexGrow: 0.2, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                      >
                        <MenuItem
                            onClick={() => {
                              navigate("/home");
                            }}
                        >
                          Home
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                              navigate("/dashboard");
                            }}
                        >
                          Vacancies Request
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                              navigate("/job-list");
                            }}
                        >
                          List of Vacancies
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                              navigate("/report");
                            }}
                        >
                          Reports
                        </MenuItem>
                        {/*<MenuItem onClick={() => { navigate("/home")}}>Interview Calendar</MenuItem>*/}
                      </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        no
                        rap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,
                          display: { xs: "flex", md: "none" },
                          flexGrow: 1,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                    >
                      <img src={navLogo} className={Classes.navImgMobile} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                      <MenuItem
                          onClick={() => {
                            navigate("/home");
                          }}
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                      >
                        Vacancies Request
                      </MenuItem>
                      <MenuItem
                          onClick={() => {
                            navigate("/job-list");
                          }}
                      >
                        List of Vacancies
                      </MenuItem>
                      <MenuItem
                          onClick={() => {
                            navigate("/report");
                          }}
                      >
                        Reports
                      </MenuItem>
                      {/*<MenuItem onClick={() => { navigate("/home")}}>Interview Calendar</MenuItem>*/}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: { sx: "none", md: "flex" }, mt: 1.5 }}>
                          {name}
                        </Box>
                        <Box>
                          <IconButton
                              size="large"
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit"
                          >
                            <AccountCircle />
                          </IconButton>
                          <Menu
                              id="menu-appbar"
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                          >
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Container>
        ) : (
            <Container>
              <AppBar
                  position="static"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "none",
                    color: "#141414",
                  }}
              >
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <img src={navLogo} className={Classes.navImg} />
                    <Box
                        sx={{ flexGrow: 0.2, display: { xs: "flex", md: "none" } }}
                    >
                      <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: "block", md: "none" },
                          }}
                      >
                        <MenuItem
                            onClick={() => {
                              navigate("/home");
                            }}
                        >
                          Home
                        </MenuItem>
                        {/* <MenuItem
                      onClick={() => {
                        navigate("/vacancies-form");
                      }}
                    >
                      Request Vacancies
                    </MenuItem> */}
                      </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        no
                        rap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,
                          display: { xs: "flex", md: "none" },
                          flexGrow: 1,
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".3rem",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                    >
                      <img src={navLogo} className={Classes.navImgMobile} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                      {/*<MenuItem*/}
                      {/*    onClick={() => {*/}
                      {/*      navigate("/vacancies");*/}
                      {/*    }}*/}
                      {/*>*/}
                      {/*  <Typography variant="subtitle1" color="text.primary">*/}
                      {/*    About Us*/}
                      {/*  </Typography>*/}
                      {/*</MenuItem>*/}
                      {/*<MenuItem*/}
                      {/*    onClick={() => {*/}
                      {/*      navigate("/vacancies");*/}
                      {/*    }}*/}
                      {/*>*/}
                      {/*  <Typography variant="subtitle1" color="text.primary">*/}
                      {/*    Vacancies*/}
                      {/*  </Typography>*/}
                      {/*</MenuItem>*/}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                      <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <Box sx={{ mx: 1 }}>
                          <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#141414!important",
                                borderRadius: "8px",
                                width: "100%",
                                padding: "6px 16px",
                                textTransform: "capitalize",
                              }}
                              onClick={() => {
                                navigate("/signup");
                              }}
                          >
                            Sign Up
                          </Button>
                        </Box>
                        <Box sx={{ mx: 1 }}>
                          <Button
                              variant="outline"
                              sx={{
                                borderRadius: "8px",
                                width: "100%",
                                padding: "6px 16px",
                                textTransform: "capitalize",
                              }}
                              onClick={() => {
                                navigate("/signin");
                              }}
                          >
                            Sign In
                          </Button>
                        </Box>
                      </Box>
                      <Box
                          sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}
                      >
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Box>
                              <LoginIcon sx={{ color: "#141414" }}></LoginIcon>
                            </Box>
                          </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                          <MenuItem
                              onClick={() => {
                                navigate("/signup");
                              }}
                          >
                            <Typography variant="subtitle1" color="text.primary">
                              Sign Up
                            </Typography>
                          </MenuItem>
                          <MenuItem
                              onClick={() => {
                                navigate("/signin");
                              }}
                          >
                            <Typography variant="subtitle1" color="text.primary">
                              Sign In
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Container>
        )}
      </>
  );
};
export default Navbar;

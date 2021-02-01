import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EcoIcon from "@material-ui/icons/Eco";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    boxShadow: "1px 10px 50px 1px rgba(0,0,0,0.5)",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 50px 1px rgba(0,0,0,0.9)",
      backgroundColor: "white",
      color: "#FF0102",
    },
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: "white",

    borderRadius: 5,

    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "10px 10px 50px 1px rgba(0,0,0,0.7)",
      backgroundColor: "white",
      color: "#FF0102",
    },
  },
  displayName: {
    margin: 10,
    fontSize: 17,
  },
}));

export default function Navbar() {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  //console.log("currentUser", currentUser?.data?.username);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    //console.log(currentUser);
    if (currentUser == null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [currentUser]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await axios
      .post("https://blog-backend-django.herokuapp.com/dj-rest-auth/logout/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setAuth(false);
        window.localStorage.clear();
        history.push("/login");
      })
      .catch((err) => console.log(err));
  };
  const handleProfile = () => {
    history.push("/profile");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            href="/"
          >
            <EcoIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Awesome Blog
          </Typography>
          {!auth ? (
            <div>
              {/* <IconButton
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
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */}

              <Button className={classes.button} href="/login">
                Sign In
              </Button>
              <Button className={classes.button} href="/register">
                Sign Up
              </Button>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <p className={classes.displayName}>
                  {currentUser?.data?.username}
                </p>

                <AccountCircle className={classes.accountIcon} />
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
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

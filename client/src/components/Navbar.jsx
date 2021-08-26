import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navlink: {
    color: "white",
    margin: "5px",
    fontSize: "15px",
    textDecoration: "none",
  },
}));

const activeStyle = {
  fontWeight: "bold",
  color: "red",
};

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            RMS
          </Typography>
          <NavLink
            exact
            to="/"
            activeStyle={activeStyle}
            className={classes.navlink}
          >
            Home
          </NavLink>
          <NavLink
            exact
            to="/about"
            activeStyle={activeStyle}
            className={classes.navlink}
          >
            About
          </NavLink>
          <NavLink
            exact
            to="/login"
            activeStyle={activeStyle}
            className={classes.navlink}
          >
            Login
          </NavLink>
          <NavLink
            exact
            to="/signup"
            activeStyle={activeStyle}
            className={classes.navlink}
          >
            Signup
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

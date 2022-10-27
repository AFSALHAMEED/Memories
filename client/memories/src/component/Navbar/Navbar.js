import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyle from "./style.js";
import memories from "../../images/memories.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode"

function Navbar() {
  const classes = useStyle();
const [user,setUser] = useState(null)

const dispatch = useDispatch()
const navigate = useNavigate()
const location = useLocation()
console.log("user" ,user);
const logOut= ()=>{
  dispatch({type:"LOGOUT"})
  navigate("/")
  setUser(null)
}

useEffect(()=>{

  const token = user?.result?.token

  if(token){
    const decodeToken = decode(token)
    if(decodeToken.exp * 1000 < new Date().getTime()) logOut()
  }
  setUser(JSON.parse(localStorage.getItem("token")))

  console.log("user1",user);
},[location])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="" height="60" />
      </div>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.name}
            ></Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logOut}
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

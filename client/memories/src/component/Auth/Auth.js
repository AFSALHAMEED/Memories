import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
 
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import useStyle from "./style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./Icon";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signIn,signUp} from "../../action/auth"

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
function Auth() {
  const classes = useStyle();
const dispatch = useDispatch()
const navigate = useNavigate()
  const clientId = "968435344615-jjv87ualb5rbj04g9s100l2bihb0c4c0.apps.googleusercontent.com"
const [formData,setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false);

  const [isSignUp,setIsSignUp]  = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    if(isSignUp){
      dispatch(signUp(formData))
    
    }
    else{
      dispatch(signIn(formData))
navigate("/")
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevState)=>!prevState)
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const switchMode = ()=>{
    setIsSignUp((prevState)=>!prevState )
    setShowPassword(false)
  }
const GoogleSuccess = async (res)=>{
  const token = res?.credential
console.log("response",res);

try {
  dispatch({type:"AUTH", data:token})
  navigate("/")
} catch (error) {
  console.log(error);
}
}

// const GoogleFail = (error)=>{
//   console.log(error);
// console.log("failed to sign in");
// }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "sign Up" : "sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  xs={12}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="confirmPassword"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin 
          clientId={clientId}
          render={(renderProps)=>(
            <Button 
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={renderProps.onClick}
            startIcon={<Icon/>}
            variant="contained"
            >Google Sign In</Button>
          )}
          onSuccess={GoogleSuccess}
          onError={(error)=>console.log(error)}
          cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-end" >
            <Grid item>
                <Button onClick={switchMode}>
                    {isSignUp ? "Already have a account? sign in ": "Dont have a account signUp" }
                </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;

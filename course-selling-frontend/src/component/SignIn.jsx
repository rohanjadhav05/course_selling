import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../service/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"

    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "content",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
}));


export const SignIn = () => {

  const classes = useStyles();
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const navigator = useNavigate();

  function loginUser(e){
    e.preventDefault();
    const loginUserDto = {username, password};
    if(username.length == 0){
        toast.warning("Please Enter UserName");
    }
    else if(password.length == 0){
        toast.warning("Please Enter Password");
    }
    else{
        login(loginUserDto).then((response) => {
            const result = response.data
            console.log("Result : "+result);
            if(result['status'] == 'success'){
               const payload = result['data'].jwtToken;
                localStorage['id'] = result['data'].id;
                console.log(result['data'].id);
                localStorage['jwt'] = result['data'].jwtToken
                localStorage['loginStatus'] = 1
                console.log('JWT : ', result['data'].jwtToken)
                const message = 'Welcome to Atharva Classes '
                if (result['data'].roles == 'ROLE_ADMIN') {
                    navigator('/Admin', { state: { message } })
                } else if (result['data'].roles == 'ROLE_USER') {
                    navigator('/User', { state: { message } })
                }
            }
           // toast.success("Login Successfully");
        }).catch(err => {
            toast.error("InCorrect Username or Password");
        })
    } 
  }

  return (
    <Grid container component="main" className={classes.root} alignItems="center" justifyContent="center">
      <CssBaseline />
      <Grid item xs={false} sm={7} md={4}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="username"
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                SetUsername(e.target.value)
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                SetPassword(e.target.value)
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginUser}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/ForgetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

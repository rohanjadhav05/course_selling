import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { changePassword, userExits } from "../service/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(theme => ({
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

const ForgetPasswordComponent = () => {
    const classes = useStyles();
    const [username, SetUserName] = useState('');
    const [password, SetPassword] = useState('');
    const [isExists, setIsExists] = useState(false);
    const navigator = useNavigate();

    function CheckIfUserExists(e){
        e.preventDefault();
        console.log(username);
        userExits(username).then((response) => {
            const result = response.data;
            if(result.status == 'success'){
                setIsExists(true);
                toast.success("User Exists");
            }
            else{
                toast.error("User Doesn't Exists");
            }
        }).catch(err => {
            console.error(err);
        })
    }

    function forgPassword(e){
        e.preventDefault();
        console.log(username+" : "+password);
        const loginDto = { username, password};
        changePassword(loginDto).then((response) => {
            const result = response.data;
            if(result.status == 'success'){
                toast.success("Password changed Successfully !!!");
                navigator("/LogIn");
            }else{
                toast.error("Failed Changing Password");
            }
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <div id='changePassword' style={{ display: '-webkit-box'}}>
    <Grid container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forget Password
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
                SetUserName(e.target.value)
              }}
              disabled={isExists}
            />
            { !isExists &&
                         <Button type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={CheckIfUserExists}
                       >
                         Check if User Exists
                       </Button>
            }
            {
                isExists && 
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
            }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {
                isExists &&
                <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={forgPassword}
            >
              Forgot Password
            </Button>

            }
            <Grid container>
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
    </div>
  )
}

export default ForgetPasswordComponent
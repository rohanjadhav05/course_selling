// Signup.jsx
import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify' 
import { createUser } from '../service/service';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  container: {
    display: "flex !important",
    alignItems: "center !important",

    
  },
}));

const Signup = () => {
  const [name, SetName] = useState('');
  const [email, SetEmail ] = useState('');
  const [password, SetPassword] = useState('');
  const [roles, SetRoles] = useState('');
  const navigator = useNavigate();

  function saveUser(e){
    e.preventDefault();
    const UserDto = {name, email, password, roles}; 
    if(name.length == 0){
      toast.warning("Please Enter UserName");
    }
    else if(email.length == 0){
      toast.warning("Please Enter Email");
    }
    else if(password.length == 0){
      toast.warning("Please Enter Password");
    }
    else if(roles.length == 0){
      toast.warning("Please the Role");
    }
    else{
      createUser(UserDto).then((response) => {
        console.log(response.data);
        toast.success("User Registor Successfully");
        navigator("/");
      }).catch(err => {
        toast.error("User with same UserName or Email is register");
      })
    }
  }
  const classes = useStyles();
  
  return (
      <Container component="main" maxWidth="xs" className={classes.container} >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={(e) => {
                    SetName(e.target.value)
                  }}
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    SetEmail(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    SetPassword(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roles}
                    label="Role"
                    onChange={(e) => {
                      SetRoles(e.target.value)
                    }}
                  >
                    <MenuItem value={'ROLE_USER'}>User</MenuItem>
                    <MenuItem value={'ROLE_ADMIN'}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveUser}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
};

export default Signup;

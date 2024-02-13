import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  const navigator = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  console.log("loginStatus :  "+localStorage['loginStatus']);
  React.useEffect(() => {
    console.log("inside useEffect");
    if(localStorage['loginStatus'] == 1){
      setIsLoggedIn(true);
    }
  });

  function logOutUser(){
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    navigator("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{position : 'fixed', top : 0}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{textAlign :'center'}}>
            <Link href="/" target="_blank" rel="noopener noreferrer"  style={{color:"white"}}>
              Welcome to Atharva Classes
            </Link>
          </Typography>
          {
            isLoggedIn &&
            <AccountCircleIcon fontSize='medium' href="/profile"/>
          }
          {
            !isLoggedIn &&
            < Button color="inherit" href="/LogIn">Login</Button>
          }
          {
            !isLoggedIn &&
            <Button color="inherit" href="/SignUp">SignUp</Button>
          }
          {
            isLoggedIn && 
            <Button color="warning" onClick={logOutUser}>LogOut</Button>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
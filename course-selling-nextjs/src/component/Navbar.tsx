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
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    console.log("is Logged in : "+Cookies.get('loginStatus'));
    if (Cookies.get('loginStatus') === '1') {
      setIsLoggedIn(true);
    }
  }, [Cookies.get('loginStatus')]);

  function logOutUser() {
    Cookies.remove('loginStatus');
    Cookies.remove('id');
    Cookies.remove('jwtToken');
    setIsLoggedIn(false);
    router.push('/');
  }

  return (
    <div id="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ position: 'fixed', top: 0 }}>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ textAlign: 'center' }}>
              <Link href="/" rel="noopener noreferrer" style={{ color: "white" }}>
                Welcome to Atharva Classes
              </Link>
            </Typography>
            {
              isLoggedIn &&
                <AccountCircleIcon fontSize='medium' href="/profile"/>
          }
          {
            !isLoggedIn &&
            < Button color="inherit" onClick={() => { router.push("/signin") }}
            >Login</Button>
          }
          {
            !isLoggedIn &&
                  <Button color="inherit" onClick={() => {router.push("/signup")}} >SignUp</Button>
              }
          {
            isLoggedIn && 
            <Button color="warning" onClick={logOutUser}>LogOut</Button>
            }

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
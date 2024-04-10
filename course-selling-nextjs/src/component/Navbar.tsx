import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { drawerState } from '@/store/atoms/course';
import { userState } from '@/store/atoms/user';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const router = useRouter();
  const [drawe, setDrawer] = useRecoilState(drawerState);
  const [User, setUser] = useRecoilState(userState);
  const [initials, setInitials] = React.useState('');
  const [color, setColor] = React.useState('');

  React.useEffect(() => {
    if (Cookies.get('loginStatus') === '1') {
      setIsLoggedIn(true);
    }
    if(User.userEmail){
      setInitials(User.userEmail!.charAt(0));
      setColor(randomColor({ luminosity: 'light' }));
    }
  }, [Cookies.get('loginStatus')]);

  function logOutUser() {
    Cookies.remove('loginStatus');
    Cookies.remove('id');
    Cookies.remove('jwtToken');
    setIsLoggedIn(false);
    setUser({
      isLoading:true,
      userEmail :null
    })
    router.push('/');
  }
  const toggleDrawer = () => {
    setDrawer(!drawe);
  };

  return (
    <div id="header" style={{ position: 'fixed', top: 0, zIndex: 10000, width: '100%' }} >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer}
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
              <Avatar name={User.userEmail ? initials : 'No Name' } color={User.userEmail ? color : '#ccc'} size="40" round onClick={() => { router.push("/profile")}} />
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
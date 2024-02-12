import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

export default function Navbar() {
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
          <Button color="inherit" href="/LogIn">Login</Button>
          <Button color="inherit" href="/SignUp">SignUp</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
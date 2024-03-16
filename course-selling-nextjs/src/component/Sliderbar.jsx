// components/Drawer.js
import React from 'react';
import { Drawer as MuiDrawer, List, ListItem, ListItemText, Drawer, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { drawerState, roleState } from '@/store/atoms/course';
import { useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { userState } from '@/store/atoms/user';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Sliderbar = () => {
  const router = useRouter();
  const drawerValue = useRecoilValue(drawerState);
  const role = useRecoilValue(roleState);
  const User = useRecoilValue(userState);

  return (
      <Drawer
            open={drawerValue}
            variant="persistent"
            anchor="left"
            style={{zIndex:999, padding:10}}
        >
    
            <div style={{ width: 200, height:'100vh', padding:20 ,paddingTop:100, backgroundColor:'#aeccf5', display: "block", justifyContent:"center"}}>
            <Typography style={{padding:20}}>Main Menu</Typography>
             { role ? 
                      <Button
                        variant="text"
                        color="inherit"
                        startIcon={<VisibilityOutlinedIcon sx={{ fontSize: 10 }} />}
                        onClick={() => {
                        router.push("/purchasedCourses");
                        }}>
                          View Purchased Course
                        </Button>
                    : 
                      <Button
                        variant="text"
                        color="inherit"
                        startIcon={<AddIcon sx={{ fontSize: 10 }} />}
                        onClick={() => {
                        router.push("/add");
                        }}
                        style={{padding:10}}
                      >
                        Create Course
                      </Button>
            }
            <br />
            <br />
            { !role && <Button
                  variant="text"
                  color="inherit"
                  startIcon={<AttachMoneyOutlinedIcon sx={{ fontSize: 10 }} />}
                  onClick={() => {
                  router.push("/sales");
                  }}
                  style={{padding:10}}
              >
                  
                  Course Sales
              </Button>
            }
            </div>
        </Drawer>
  );
};

export default Sliderbar;

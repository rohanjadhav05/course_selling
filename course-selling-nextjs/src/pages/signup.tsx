// Signup.jsx
import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify' 
import { createUser, googleLogin } from '../service/HomeService';
import { Card } from '@mui/material';
import { useRouter } from 'next/router';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { roleState } from '@/store/atoms/course';
import { userState } from '@/store/atoms/user';

const signup = () => {
  const [name, SetName] = useState('');
  const [email, SetEmail ] = useState('');
  const [password, SetPassword] = useState('');
  const [roles, SetRoles] = useState('');
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const setIsUserRole = useSetRecoilState(roleState);
  
  function onGoogleSucces(response : any){
    googleLogin(response)
      .then((res) => {
        const result = res.data;
        if(result.status == "success"){
          Cookies.set('jwtToken', result.data.jwtToken, { expires: 7 }); // Expires in 7 days
          Cookies.set('id', result['data'].id, { expires: 7 }); 
          Cookies.set('loginStatus', "1", { expires: 7 });
          setIsUserRole(true);
          setUser({
            isLoading:false,
            userEmail : result.data.email
          })
          toast.success("Successfully Login In");
          router.push("/user");
        }
        else{
          toast.error("Failed");
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div id = 'signup'>
        <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
          <div style={{display: "flex", justifyContent: "center"}}>
          <Card variant={"outlined"} style={{width: 400, padding: 20}}>
          <TextField
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        SetName(elemt.value);
                    }}
                    fullWidth={true}
                    label="Enter User Name"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        SetEmail(e.target.value);
                    }}
                    fullWidth={true}
                    label="Enter Email"
                    variant="outlined"
                    type={"text"}
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        SetPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Enter Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>
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
                <br/><br/>
                <Button 
                  type="submit"
                  fullWidth
                  color="primary"
                  variant='contained'
                  onClick={async() =>{
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
                        router.push("/");
                      }).catch(err => {
                        toast.error("User with same UserName or Email is register");
                      })
                    }
                  }}
                  
                  >Sign Up</Button>
                  <br/>
                  <br/>
                  <div style={{display:'flex', justifyContent:"center"}}>
                      <GoogleLogin
                      text='continue_with'
                      shape='circle'
                      onSuccess={credentialResponse => {
                        onGoogleSucces(credentialResponse.credential);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                      theme='filled_blue'
                      logo_alignment='left'
                    />
                  </div>
            </Card>
          </div>
      </div>
  );
};

export default signup;

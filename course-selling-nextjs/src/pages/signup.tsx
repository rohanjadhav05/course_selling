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
import { createUser } from '../service/service';
import { Card } from '@mui/material';
import { useRouter } from 'next/router';

const signup = () => {
  const [name, SetName] = useState('');
  const [email, SetEmail ] = useState('');
  const [password, SetPassword] = useState('');
  const [roles, SetRoles] = useState('');
  const router = useRouter();
  
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
            </Card>
          </div>
      </div>
  );
};

export default signup;

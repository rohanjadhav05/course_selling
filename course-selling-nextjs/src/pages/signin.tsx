import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Card } from "@mui/material";
import { googleLogin, login } from "@/service/HomeService";
import Cookies from 'js-cookie';
import { useRecoilState, useSetRecoilState } from "recoil";
import { roleState } from "@/store/atoms/course";
import { UserState, userState } from "@/store/atoms/user";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const signin = () => {

  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const router = useRouter();
  const setIsUserRole = useSetRecoilState(roleState);
  const [user, setUser] = useRecoilState<UserState>(userState);

  async function onGoogleSuccess(response: any) {
    try {
      const res = await googleLogin(response);
      const result = res.data;
      console.log(result.data);
      
      if (result.status === "success") {
        Cookies.set('jwtToken', result.data.jwtToken, { expires: 7 }); // Expires in 1 day
        Cookies.set('id', result.data.id, { expires: 7 });
        Cookies.set('loginStatus', "1", { expires: 7 });
        console.log("email : " + result.data.email);
        
        setUser(prevUser => ({
          ...prevUser,
          isLoading: false,
          userEmail: result.data.email
        }));
        setIsUserRole(true);
        toast.success("Successfully Logged In");
        router.push("/user");
      } else {
        toast.error("Login Failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  

  return <div>
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
          onChange={(event) => {
              SetUsername(event.target.value);
          }}
          fullWidth={true}
          label="Email"
          variant="outlined"
      />
      <br/><br/>
      <TextField
          onChange={(e) => {
              SetPassword(e.target.value);
          }}
          fullWidth={true}
          label="Password"
          variant="outlined"
          type={"password"}
      />
      <br/><br/>

      <Button
          size={"large"}
          variant="contained"
          fullWidth 
          onClick={async () =>{
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
                        Cookies.set('jwtToken', payload, { expires: 1 }); // Expires in 7 days
                        Cookies.set('id', result['data'].id, { expires: 1 }); 
                        Cookies.set('loginStatus', "1", { expires: 1 });
                        setUser({
                          isLoading:false,
                          userEmail :loginUserDto.username
                        })
                        if (result['data'].roles == 'ROLE_ADMIN') {
                          setIsUserRole(false);
                          router.push('/admin');
                        } else if (result['data'].roles == 'ROLE_USER') {
                          setIsUserRole(true);
                          router.push('/user');
                        }
                      }
                    // toast.success("Login Successfully");
                  }).catch(err => {
                      toast.error("InCorrect Username or Password");
                  })
              }
          }
         }
      > Signup</Button>
      <br/> <br/>
      <div style={{display:'flex', justifyContent:"center"}}>
                            <GoogleLogin
                            text='signup_with'
                            shape='circle'
                            onSuccess={credentialResponse => {
                              onGoogleSuccess(credentialResponse.credential);
                            }}
                            onError={() => {
                              console.log('Login Failed');
                            }}
                          />
                        </div>
        </Card>
      </div>
</div>;
}

export default signin;
  
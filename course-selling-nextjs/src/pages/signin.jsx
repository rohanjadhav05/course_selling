import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Card } from "@mui/material";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: 'white'
    }
  },
    paper: {
      margin:  "8px 4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin : "1px",
      backgroundColor: 'black'
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: "3px"
    },
    submit: {
      margin: "3px 0px 2px"
    },
    container: {
      display: "flex !important",
      alignItems: "center !important",
    },
}));


const signin = () => {

  const classes = useStyles();
  const [username, SetUsername] = useState('');
  const [password, SetPassword] = useState('');
  const router = useRouter();

  function loginUser(e){
    e.preventDefault();
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
                localStorage['id'] = result['data'].id;
                console.log(result['data'].id);
                localStorage['jwt'] = result['data'].jwtToken
                localStorage['loginStatus'] = 1
                console.log('JWT : ', result['data'].jwtToken)
                if (result['data'].roles == 'ROLE_ADMIN') {
                  router.push('/admin');
                } else if (result['data'].roles == 'ROLE_USER') {
                  router.push('/user');
                }
            }
           // toast.success("Login Successfully");
        }).catch(err => {
            toast.error("InCorrect Username or Password");
        })
    } 
  }

  return (
    <div id = 'signin' style={{ display: 'flex', justifyContent : 'center', marginTop:300, marginBottom:10}}>
       <div style={{
                paddingTop: 10,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        setEmail(elemt.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
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
                    onClick={async () => {
                        const res = await axios.post(`${BASE_URL}/admin/login`, {
                            username: email,
                            password: password
                        }, {
                            headers: {
                                "Content-type": "application/json"
                            }
                        });
                        const data = res.data;

                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({
                            userEmail: email,
                            isLoading: false
                        })
                        router.push("/courses")
                    }}

                >Signin</Button>
            </Card>
    </div>
  );
}

export default signin;
  
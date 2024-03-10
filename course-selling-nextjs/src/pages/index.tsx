import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Cookies from 'js-cookie';
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from 'next/router'
import { userEmailState } from "@/store/selectors/user";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const userEmail = useRecoilValue(userEmailState);
  console.log("userRmail : "+userEmail);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("is Logged in : "+Cookies.get('loginStatus'));
    if (Cookies.get('loginStatus') === '1') {
      setIsLoggedIn(true);
    }
  }, [Cookies.get('loginStatus')]);

  return (
    <>
    <div style={{height : "100vh", width:"100vw"}}>
      <Grid container style={{padding: "5vw"}}>
          <Grid item xs={12} md={6} lg={6}>
              <div style={{marginTop: 100}}>
                  <Typography variant={"h2"}>
                      Coursera Admin
                  </Typography>
                  <Typography variant={"h5"}>
                      A place to learn, earn and grow
                  </Typography>
                  <br />
                    { !isLoggedIn &&
                      <div style={{marginRight: 10}}>
                          <Button
                              size={"large"}
                              variant={"contained"}
                              onClick={() => {
                                router.push("/signup")
                              }}
                          >Signup</Button>
                      </div>
                    }   
                     <br/>
                    { !isLoggedIn &&
                      <div>
                          <Button
                              size={"large"}
                              variant={"contained"}
                              onClick={() => {
                                router.push("/signin")
                              }}
                          >Signin</Button>
                      </div>
                    }
                  </div>
              <div>
              </div>
          </Grid>
          <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
              <img src={"https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"} width={500} height={400} alt={"course-image"}/>
          </Grid>
      </Grid>
      </div>
    </>
  );
}

import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from "axios";
import { Course, roleState } from '@/store/atoms/course';
import { Router, useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';

function admin() {
    const [course, SetCourses] = useState([]);
    const router = useRouter();
    const init = async () => {
        const response = await axios.get("http://localhost:8080/admin/getAllCourse", {
            headers : {
                Authorization : `Bearer ${Cookies.get('jwtToken')}`
            }
        })
        const result = response.data;
        if(result.status == "success"){
            SetCourses(result.data);
        }
    }

    useEffect(() => {
        init();
    }, []);

  return ( 
    <div id="admin" style={{ paddingTop: 70 }}>
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 30 }}>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<AddIcon sx={{ fontSize: 10 }} />}
        onClick={() => {
            router.push("/add");
        }}
      >
        Create Course
      </Button>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {course.map((c:Course) => {
        return <Courses key={c.courseId} course={c} />;
      })}
    </div>
  </div>
  )
}

export function Courses({course} : {course: Course}){
    const router = useRouter();
    const role = useRecoilValue(roleState);
    return <Card style={{
        margin:10,
        width:300,
        minHeight:200,
        padding:20
    }}>
        <Typography textAlign={"center"} variant='h5'>{course.courseName}</Typography>
        <Typography textAlign={"center"} variant='subtitle1'>{course.courseDesc}</Typography>
        <img src={course.courseImage} style={{width:300}}></img>
        <div style={{display:'flex', justifyContent:"center", marginTop:20}}>
            <Button variant="contained" size="large" onClick={() => {
                if(role){
                    router.push("/purchase/"+course.courseId);
                }
                else{
                    router.push("/course/"+course.courseId);
                }   
            }}>
                {
                    role ? "Purchase" : "Edit"
                }
            </Button>

        </div>
    </Card>
}
export default admin;
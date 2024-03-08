import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from "axios";
import { Course } from '@/store/atoms/course';
import { useRouter } from 'next/router';

function admin() {
    const [course, SetCourses] = useState([]);

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
    <div id="admin" style={{paddingTop:70, display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
        {
            course.map(c => {
                return <Course course={c} />
            })
        }
    </div>
  )
}
export function Course({course} : {course: Course}){
    const router = useRouter();
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
                router.push("/course/"+course.courseId);
            }}>
                Edit
            </Button>

        </div>
    </Card>
}
export default admin;
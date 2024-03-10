import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Course, roleState } from '@/store/atoms/course';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import { getAllcourses } from '@/service/AdminService';

function admin() {
    const [course, SetCourses] = useState([]);
    const router = useRouter();
    const init = async () => {
        getAllcourses().then(response => {
            const result = response.data;
            if(result.status == "success"){
                SetCourses(result.data);
            }
        });   
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
        return <Coursescomp key={c.courseId} course={c} />;
      })}
    </div>
  </div>
  )
}

export function Coursescomp({course} : {course: Course}){
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
        <img src={course.courseImage} style={{width:300, height:200}}></img>
        <Typography textAlign={"center"} variant='h6'>Price - {course.coursePrice}</Typography>
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
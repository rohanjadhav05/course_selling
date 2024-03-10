import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; 
import { Coursescomp } from './admin';
import { Course } from '@/store/atoms/course';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { getpublishedCourse } from '@/service/UserService';

const user = () => {
  const [course, setCourse ] = useState([]);
  const router = useRouter();
  
  const init = async () => {
    getpublishedCourse().then(response => {
      const result = response.data;
      console.log(result);
      if(result.status == "success"){
          setCourse(result.data);
      }
      else{
          toast.error("failed");
      }
    })
  }
    useEffect(() => {
        init();
    }, []);

  return (
    <div id = "user" style={{paddingTop:70}} >
      <div>
        <Typography variant='h5' style={{display: "flex", justifyContent:'center'}}>
            All available  Courses
        </Typography>
      </div>
      <div style={{display:"flex", justifyContent:"flex-end", paddingRight:30}} >
      <Button onClick={() => {
        router.push("/purchasedCourses")
      }}>View Purchased Courses</Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop:20}}>
        {course.map((c:Course) => {
            return <Coursescomp key={c.courseId} course={c} />;
        })}
      </div>
    </div>
  )
}

export default user
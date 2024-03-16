import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'; 
import { Coursescomp } from './admin';
import { Course, drawerState } from '@/store/atoms/course';
import { Typography } from '@mui/material';
import { getpublishedCourse } from '@/service/UserService';
import { useRecoilValue } from 'recoil';

const user = () => {
  const [course, setCourse ] = useState([]);
  const drawerValue = useRecoilValue(drawerState);
  
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
    <div id = "user" style={{paddingTop:70, marginLeft: drawerValue ? 250 : 0}} >
      <div>
        <Typography variant='h5' style={{display: "flex", justifyContent:'center'}}>
            All available  Courses
        </Typography>
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
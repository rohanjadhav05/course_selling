import { Button, Card, Drawer, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Course, drawerState, roleState } from '@/store/atoms/course';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import { getAllcourses } from '@/service/AdminService';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { toast } from 'react-toastify';

function admin() {
    const [course, SetCourses] = useState([]);
    const router = useRouter();
    const drawerValue = useRecoilValue(drawerState);

    const init = async () => {
        getAllcourses().then((response => {
            const result = response.data;
            if(result.status == "success"){
                SetCourses(result.data);
            }else{
                toast.error("failed");
            }
        }))
    
    }

    useEffect(() => {
        init();
    }, []);

  return ( 
    <div style={{ display: 'flex' }}>
        <Drawer
            open={drawerValue}
            variant="persistent"
            anchor="left"
            style={{zIndex:0, padding:10}}
        >
            {/* Drawer content goes here */}
            <div style={{ width: 250, height:'100vh', padding:20 ,paddingTop:100, backgroundColor:'#aeccf5', display: "block", justifyContent:"center"}}>
            {/* Drawer content */}
            <Typography style={{padding:20}}>Main Menu</Typography>
            <Button
                variant="text"
                color="inherit"
                startIcon={<AddIcon sx={{ fontSize: 10 }} />}
                onClick={() => {
                router.push("/add");
                }}
                style={{padding:10}}
            >
                Create Course
            </Button>
            <br />
            <br />
            <Button
                variant="text"
                color="inherit"
                startIcon={<AttachMoneyOutlinedIcon sx={{ fontSize: 10 }} />}
                onClick={() => {
                router.push("/sales");
                }}
                style={{padding:10}}
            >
                
                Course Sales
            </Button>
            </div>
            </Drawer>
        <div id="admin" style={{ paddingTop: 70, marginLeft: drawerValue ? 250 : 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {course.map((c:Course) => {
            return <Coursescomp key={c.courseId} course={c} />;
        })}
        </div>
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
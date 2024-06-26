import { courseState, drawerState } from '@/store/atoms/course';
import { isCourseLoading } from '@/store/selectors/course';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Loading } from '@/component/Loading';
import { Button, Card, TextField, Typography } from '@mui/material';
import { getCourseById, purchaseCourse } from '@/service/UserService';

const Purchase = () => {
    const router = useRouter();
    const { courseId } = router.query;
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const courseLoading = useRecoilValue(isCourseLoading);
    const drawerValue = useRecoilValue(drawerState);

    useEffect(() => {
        getCourseById(courseId).then(res => {
          const result = res.data;
          console.log("result : "+JSON.stringify(result.data, null, 2))
          if(result.status == "success"){
            setCourse({isLoading : false, course:result.data})
          }
        }).catch(e => {
          setCourse({isLoading:true, course:null});
          toast.error("failed");
          console.error(e);
        })
      }, []);

    if(courseLoading){
        return <Loading />
    }

    return (
        <div id="purchase" style={{paddingTop:100, paddingLeft : drawerValue ? 250 : 0 }}>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Typography variant='h3'>User Portal - Purchase course</Typography>
            </div>
            <br />
            <br />
            <div style={{display: "flex", justifyContent: "center"}}>
                <TextBox />
            </div>
        </div>
    )
}

function TextBox(){
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const [courseId, setCourseId] = useState(courseDetails.course?.courseId);
    const [courseName, setCourseName] = useState(courseDetails.course?.courseName);
    const [courseDesc, setCourseDesc] = useState(courseDetails.course?.courseDesc);
    const [courseImage, setCourseImage] = useState(courseDetails.course?.courseImage);
    const [coursePrice, setCoursePrice] = useState(courseDetails.course?.coursePrice);
    const [published, setPublished] = useState(courseDetails.course?.published);
    const router = useRouter();
    const drawerValue = useRecoilValue(drawerState);

    useEffect(() => {
        setCourseId(courseDetails.course?.courseId);
        setCourseName(courseDetails.course?.courseName);
        setCourseDesc(courseDetails.course?.courseDesc);
        setCourseImage(courseDetails.course?.courseImage);
        setCoursePrice(courseDetails.course?.coursePrice);
        setPublished(courseDetails.course?.published);
    }, [courseDetails]);

    return (
        <div id = "purchase">
        <Card variant={"outlined"} style={{width: 400, padding: 20 }}>
                <TextField
                        value={courseDetails.course?.courseName}
                        fullWidth={true}
                        label="Name"
                        variant="outlined"
                        disabled
                    />
                    <br/><br/>
                    <TextField
                        value={courseDesc}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                        disabled
                    />
                    <br/><br/>
                    <TextField
                        value={coursePrice}
                        fullWidth={true}
                        label="Price"
                        variant="outlined"
                        disabled
                    />
                    <br/><br/>
                    <Button 
                    type="submit"
                    fullWidth
                    color="primary"
                    variant='contained'
                    onClick={async() =>{
                        let mappedUserDto = {
                            mappedUserId : Cookies.get("id"),
                            mappedCourseId : courseId
                        }
                        purchaseCourse(mappedUserDto)
                        .then(response => {
                            console.log("purchase  : "+response.data);
                            toast.success("coursed Purchased Succesfully");
                            router.push("/user");
                        }).catch(err => {
                            toast.error("Course Already Purchased");
                            console.error(err);
                        })
        
                    }}
                    >Purchase Course</Button>
                </Card>
        <br />
        <br/>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 40 }}>
            <Button  variant="outlined"
            color="inherit"
            onClick={() => {
                router.back();
            }}>Back</Button>
        </div>
    </div>
        
    )
}

export default Purchase
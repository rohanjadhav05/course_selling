import { courseState } from '@/store/atoms/course';
import { isCourseLoading } from '@/store/selectors/course';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { error } from 'console';
import { Loading } from '@/component/Loading';
import { Button, Card, TextField, Typography } from '@mui/material';

const Purchase = () => {
    const router = useRouter();
    const { courseId } = router.query;
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const [courseName, setCourseName] = useState(courseDetails.course?.courseName);
    const [courseDesc, setCourseDesc] = useState(courseDetails.course?.courseDesc);
    const [coursePrice, setCoursePrice] = useState(courseDetails.course?.coursePrice);
    const courseLoading = useRecoilValue(isCourseLoading);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/getCourse/${courseId}`, {
          headers : {
            "Authorization" : `Bearer ${Cookies.get('jwtToken')}`
          }
        }).then(res => {
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
        <div id="purchase" style={{paddingTop:100}}>
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

    useEffect(() => {
        setCourseId(courseDetails.course?.courseId);
        setCourseName(courseDetails.course?.courseName);
        setCourseDesc(courseDetails.course?.courseDesc);
        setCourseImage(courseDetails.course?.courseImage);
        setCoursePrice(courseDetails.course?.coursePrice);
        setPublished(courseDetails.course?.published);
        console.log("object :  "+JSON.stringify(courseDetails, null, 2)+" published : "+published);
    }, [courseDetails]);

    return (
        <Card variant={"outlined"} style={{width: 400, padding: 20}}>
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
                        axios.post("http://localhost:8080/user/purchase", {
                            mappedUserId : Cookies.get("id"),
                            mappedCourseId : courseId
                        },{
                            headers : {
                                Authorization : `Bearer ${Cookies.get('jwtToken')}`
                            }
                        }).then(response => {
                            console.log("purchase  : "+response.data);
                            toast.success("coursed Purchased Succesfully");
                            router.push("/user");
                        }).catch(err => {
                            toast.error("Failed");
                            console.error(err);
                        })
        
                    }}
                    >Purchase Course</Button>
                </Card>
    )
}

export default Purchase
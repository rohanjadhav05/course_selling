import { Loading } from '@/component/Loading';
import { courseState } from '@/store/atoms/course';
import { courseImage, courseName, coursePrice, isCourseLoading } from '@/store/selectors/course';
import { Button, Card, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const Course = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/getCourse/${courseId}`, {
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
    console.log("is UseEffect : ");
  }, []);

  if(courseLoading){
    return <Loading />
  }

  return (
    <div id="course" >
        <GrayTopper />
        <Grid container>
          <Grid item lg={8} md={12} sm={12}>
                <UpdateCard />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 40 }}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => {
            router.back();
        }}
      >
        Back
      </Button>
    </div>
    </div>
  )
}

function GrayTopper() {
  const title = useRecoilValue(courseName);
  return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
      <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <div>
              <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                  {title}
              </Typography>
          </div>
      </div>
  </div>
}

function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [courseId, setCourseId] = useState(courseDetails.course?.courseId);
  const [courseName, setCourseName] = useState(courseDetails.course?.courseName);
  const [courseDesc, setCourseDesc] = useState(courseDetails.course?.courseDesc);
  const [courseImage, setCourseImage] = useState(courseDetails.course?.courseImage);
  const [coursePrice, setCoursePrice] = useState(courseDetails.course?.coursePrice);
  const [published, setPublished] = useState(courseDetails.course?.published);

  useEffect(() => {
    setCourseId(courseDetails.course?.courseId);
    setCourseName(courseDetails.course?.courseName);
    setCourseDesc(courseDetails.course?.courseDesc);
    setCourseImage(courseDetails.course?.courseImage);
    setCoursePrice(courseDetails.course?.coursePrice);
    setPublished(courseDetails.course?.published);
    console.log("object :  "+JSON.stringify(courseDetails, null, 2)+" published : "+published);
  }, [courseDetails]);

  return <div style={{display: "flex", justifyContent: "center"}}>
  <Card variant='outlined' style={{maxWidth: 600, marginTop: 200}}>
      <div style={{padding: 20}}>
          <Typography style={{marginBottom: 10}}>Update course details</Typography>
          <TextField
              value={courseName}
              style={{marginBottom: 10}}
              onChange={(e) => {
                setCourseName(e.target.value)
              }}
              fullWidth={true}
              label="Title"
              variant="outlined"
          />

          <TextField
              value={courseDesc}
              style={{marginBottom: 10}}
              onChange={(e) => {
                  setCourseDesc(e.target.value)
              }}
              fullWidth={true}
              label="Description"
              variant="outlined"
          />

          <TextField
              value={courseImage}
              style={{marginBottom: 10}}
              onChange={(e) => {
                setCourseImage(e.target.value)
              }}
              fullWidth={true}
              label="Image link"
              variant="outlined"
          />
          <TextField
              value={coursePrice}
              style={{marginBottom: 10}}
              onChange={(e) => {
                const newPrice = parseFloat(e.target.value);
                setCoursePrice(isNaN(newPrice) ? 0 : newPrice)
              }}
              fullWidth={true}
              label="Price"
              variant="outlined"
          />
           <FormControlLabel
              control={<Checkbox value={published} checked={published} onChange={(e) => {
                                                          setPublished(e.target.checked);
                                                          if (!e.target.checked) {
                                                            setPublished(false);
                                                          }}} 
                />}
               label="Course should be Published"
            />
            <br/>
          <Button
              variant="contained"
              onClick={async () => {
                  axios.put(`http://localhost:8080/admin/updateCourse`, {
                      courseId : courseId,
                      courseName: courseName,
                      courseDesc: courseDesc,
                      courseImage: courseImage,
                      published: true,
                      coursePrice
                  }, {
                      headers: {
                          "Content-type": "application/json",
                          "Authorization" : `Bearer ${Cookies.get('jwtToken')}`
                      }
                  });
                  let updatedCourse = {
                    courseId : courseId!,
                    courseName: courseName!,
                    courseDesc: courseDesc!,
                    courseImage: courseImage!,
                    published: true!,
                    coursePrice:coursePrice!
                  };
                  setCourse({isLoading: false, course : updatedCourse});
              }}
          > Update course</Button>
      </div>
  </Card>
</div>
}

function CourseCard() {
  const title = useRecoilValue(courseName);
  const imageLink = useRecoilValue(courseImage);

  return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
   <Card style={{
      margin: 10,
      width: 350,
      minHeight: 200,
      borderRadius: 20,
      marginRight: 50,
      paddingBottom: 15,
      zIndex: 2
  }}>
      <img src={imageLink} style={{width: 350}} ></img>
      <div style={{marginLeft: 10}}>
          <Typography variant="h5">{title}</Typography>
          <Price />
      </div>
  </Card>
  </div>
}

function Price() {

  const price = useRecoilValue(coursePrice);
  return <>
      <Typography variant="subtitle2" style={{color: "gray"}}>
          Price
      </Typography>
      <Typography variant="subtitle1">
          <b>Rs {price} </b>
      </Typography>
  </>
}

export default Course
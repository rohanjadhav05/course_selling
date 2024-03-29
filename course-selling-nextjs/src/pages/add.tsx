import { addCourse } from '@/service/AdminService';
import { Button, Card, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const add = () => {
    const [courseName, setCourseName] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [coursePrice, setCoursePrice] = useState(0);
    const [courseImage, setCourseImage] = useState("");
    const router = useRouter();
  return (
    <div id="add" style={{display: "flex", justifyContent: "center", minHeight: "80vh", flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent:"center"}}>
            <Typography variant='h4'>Admin Portal - Enter Details below</Typography>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant='outlined' style={{width: 400, padding: 20, marginTop: 30, height: "100%"}}>
                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setCourseName(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setCourseDesc(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setCourseImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        const newPrice = parseFloat(e.target.value);
                        setCoursePrice(isNaN(newPrice) ? 0 : newPrice)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        let courseDto = {
                            courseName: courseName,
                            courseDesc: courseDesc,
                            courseImage: courseImage,
                            published: true,
                            coursePrice:coursePrice
                        }
                        addCourse(courseDto);
                        toast.success("Added course!");
                        router.push("/admin");
                    }}
                > Add course</Button>
            </Card>
        </div>
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

export default add
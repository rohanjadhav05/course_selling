import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { Card, Grid, Typography } from '@material-ui/core';

const UserComponent = () => {
    
    const [courses, setCourses] = useState([]);
    const headers = { headers: { Authorization: `Bearer ${localStorage['jwt']}` } }
    const REST_API_BASE_URL_USER = "http://localhost:8080/user";
    const navigator = useNavigate();

    useEffect( () => {
        getAllPublishedCourses();
    }, []);

    function getAllPublishedCourses(){
        axios.get(REST_API_BASE_URL_USER+"/courses", headers)
        .then((response) => {
            const result = response.data;
            if(result['status'] == 'success'){
                setCourses(result['data']);
            }
        }).catch(err => {
            if(response.status === 403){
                toast.warning("need to login first");
            }
        })
    }

    function purchaseCourse(course){
        const id = course.courseId;
        console.log("-------- ID : "+id);
        navigator(`/BuyCourse/${id}`);
    }

    function viewPurchasedCourse(){
        navigator('/PurchasedCourse');
    }
  return (
    <div id = "user" style={{padding : '5%'}}>
        <h2 style={{textAlign:'center'}}>User Portal - View Courses</h2>
        <div style={{width : '100%', display:'flex', justifyContent:'flex-end'}}> 
            <Button variant="text" startIcon={<InventoryOutlinedIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => viewPurchasedCourse()}>
                View Purchased Course
            </Button>
        </div>
        <Grid item lg={6} md={12} sm={12}>
            <div style={{display: "flex",  marginTop: 50, justifyContent: "center", flexWrap : 'wrap', width : '100vw'}}>
                {
                    courses.map((course) => (
                        <Card 
                        key={course.courseId} 
                        style={{
                            margin: 10,
                            width: 350,
                            minHeight: 100,
                            borderRadius: 20,
                            marginRight: 50,
                            paddingBottom: 15
                        }}>
                            <img src={course.courseImage} style={{width: 350, height:250}} ></img>
                            <div style={{marginLeft: 10}}>
                                <Typography variant="h5">{course.courseName}</Typography>
                                <Typography variant="h6">{course.courseDesc}</Typography>
                                <Typography variant="subtitle2" style={{color: "gray"}}>
                                    Price <b>Rs {course.coursePrice} </b>
                                </Typography>
                                <Button  variant="text" startIcon={<ShoppingCartIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => purchaseCourse(course)}>
                                    Purchase
                                </Button>
                            </div>
                        </Card>
                ))}
            </div> 
        </Grid>
        {/* <TableContainer component={Paper} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>Price&nbsp;</TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>Purchase Course</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.map((c) => (
                <TableRow
                    key={c.courseId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left">{c.courseName}</TableCell>
                    <TableCell align="center" component="th" scope="row">{c.courseDesc}</TableCell>
                    <TableCell align="right">{c.coursePrice} INR</TableCell>
                    <TableCell align="right">
                        <Button variant="text" startIcon={<ShoppingCartIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => purchaseCourse(c)}>
                            Purchase
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  )
}

export default UserComponent
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';

const PurchasedCourse = () => {
    
    const [courses, setCourses] = useState([]);
    const id = localStorage['id'];
    const headers = { headers: { Authorization: `Bearer ${localStorage['jwt']}` } }
    const REST_API_BASE_URL_USER = "http://localhost:8080/user";
    
    useEffect( () => {
        getPurchasedCourse();
    }, []);

    function getPurchasedCourse(){
        
        axios.get(REST_API_BASE_URL_USER+"/purchasedCourse/"+id, headers)
        .then((response) => {
            console.log("Response : "+response+" Status : "+response.status);
            const result = response.data;
            if(result['status'] == 'success'){
                setCourses(result['data'])
            }
            else{
                toast.error("Failed");
            }
        }).catch(err => {
            if(response.status === 403){
                toast.warning("need to login first");
            }        
        })
    }


  return (
    <div id="purcasedCourse" style={{padding : '15%'}}>
        <h2 style={{textAlign:'center'}}>User Portal - View Purchased Courses</h2>
        <TableContainer component={Paper} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>Price&nbsp;</TableCell>
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
                </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PurchasedCourse
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Course } from '@/store/atoms/course';
import { useRouter } from 'next/router';
import { getPurchasedCourseService } from '@/service/UserService';

const purchasedCourses = () => {
    const [courses, setCourses] = useState([]);
    const router = useRouter();
    useEffect(() => {
        getPurchasedCourse();
    },[]);

    function getPurchasedCourse(){
        getPurchasedCourseService().then(response => {
                const result = response.data;
                if(result.status == 'success'){
                    setCourses(result.data);
                }
                else{
                    toast.error("Failed");
                }
            }).catch(err => {
                console.error(err);
            })
           
    }
    
    return (
        <div>
        <div id="purchasedCourses" style={{ paddingTop:100}}>
             <h2 style={{textAlign:'center'}}>User Portal - View Purchased Courses</h2>
        <TableContainer component={Paper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" style={{padding:30}}>
            <TableHead>
                <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold', padding:'8px' }}>Name</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold', padding:'8px' }}>Description</TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold', padding:'8px' }}>Price&nbsp;</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.length > 0 ? (
                    courses.map((c : Course) => (
                    <TableRow
                        key={c.courseId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center" style={{ padding:'8px' }}>{c.courseName}</TableCell>
                        <TableCell align="center" style={{ padding:'8px' }} component="th" scope="row">
                        {c.courseDesc}
                        </TableCell>
                        <TableCell align="center" style={{ padding:'8px' }}>{c.coursePrice} INR</TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={3} align="center">
                        No courses available
                    </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </TableContainer>
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

export default purchasedCourses
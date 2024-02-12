import * as React from 'react';
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

const AdminComponent = () => {
    const [courses, setCourses] = React.useState([]);
    const navigator = useNavigate();
    
    React.useEffect( () => {
        getAllCourses();
    }, []);

    function getAllCourses(){
        const url = "http://localhost:8080/admin/getAllCourse";
        console.log("jwt : "+localStorage['jwt']);
        
        axios.get(url, {
            headers: { Authorization: `Bearer ${localStorage['jwt']}` },
        })
        .then((response) => {
            const result = response.data;
            if(result['status'] == 'success'){
                setCourses(result['data']);
                console.log("courses : "+courses[0].published);
            }
            else{
                toast.warning("Need to Login First");
            }
        }).catch(error => {
            toast.warning("Error Need to Login First");
            console.error(error);
        })
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Price&nbsp;</TableCell>
            <TableCell align="right">isPublised&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((c) => (
            <TableRow
              key={c.courseId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{c.courseName}</TableCell>
              <TableCell component="th" scope="row">
                {c.courseDesc}
              </TableCell>
              <TableCell align="right">{c.coursePrice}</TableCell>
              <TableCell align="right">{c.published}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdminComponent
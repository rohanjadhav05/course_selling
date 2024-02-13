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
import PublishIcon from '@mui/icons-material/Publish';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SecurityUpdateOutlinedIcon from '@mui/icons-material/SecurityUpdateOutlined';

const AdminComponent = () => {
    const [courses, setCourses] = React.useState([]);
    const navigator = useNavigate();
    const REST_API_BASE_URL_ADMIN = "http://localhost:8080/admin";
    const headers = { headers: { Authorization: `Bearer ${localStorage['jwt']}` } }
    
    React.useEffect( () => {
        getAllCourses();
    }, []);

    function getAllCourses(){
        axios.get(REST_API_BASE_URL_ADMIN+"/getAllCourse", headers )
        .then((response) => {
            const result = response.data;
            if(result['status'] == 'success'){
                setCourses(result['data']);
                console.log("courses : "+courses.forEach(obj => {
                  console.log(`${obj.published} : ${obj.courseId}`)
                }));
            }
        }).catch(error => {
            toast.warning("Error Need to Login First");
            console.error(error);
        })
    }

    function publishCourse(c){
      const isPublished = c.published;
      const id = c.courseId;
      console.log("isPublished inside method : "+isPublished);
      if(!isPublished){
        console.log("jwt : "+localStorage['jwt']);

        axios.put(REST_API_BASE_URL_ADMIN+"/publishCourse/"+id, null, headers )
        .then((response) => {
          const result = response.data;
          if(result['status'] == 'success'){
            toast.success("Course Published successfully");
            getAllCourses();
          }
          else{
            toast.warning("failed");
          }
        }).catch(err => {
          console.error(err);
        })
      }else{
        toast.error("Course is Already Published");
      }
    }

    function deleteCourse(c){
      const id = c.courseId;
      axios.delete(REST_API_BASE_URL_ADMIN+"/deleteCourse/"+id,headers)
      .then((response) => {
        const result = response.data;
          if(result['status'] == 'success'){
            toast.success("Course Deleted successfully");
            getAllCourses();
          }
          else{
            toast.warning("failed");
          }
      }).catch(err => {
        console.error(err);
      })
    }

    function addCourse(){
      navigator("/AddCourse")
    }
  return (
    <div >
      <Button variant="text" startIcon={<AddIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => addCourse()}>
          Add Course
      </Button>
      <TableContainer component={Paper} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align="left">Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Price&nbsp;</TableCell>
              <TableCell align="right">Published&nbsp;</TableCell>
              <TableCell align="right">Publish Course</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((c) => (
              <TableRow
                key={c.courseId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{c.courseName}</TableCell>
                <TableCell component="th" scope="row">{c.courseDesc}</TableCell>
                <TableCell align="right">{c.coursePrice} INR</TableCell>
                <TableCell align="right">{c.published ? 'Published' : 'Not Published'}</TableCell>
                <TableCell align="right">
                  <Button variant="text" startIcon={<PublishIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => publishCourse(c)}>
                        Publish
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button variant="text" startIcon={<SecurityUpdateOutlinedIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => publishCourse(c)}>
                        Update
                  </Button>
                  <Button variant="text" startIcon={<DeleteOutlineOutlinedIcon sx={{ fontSize: 10 }} />}  style={{margin:'10px' }} onClick={() => deleteCourse(c)}>
                        Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AdminComponent
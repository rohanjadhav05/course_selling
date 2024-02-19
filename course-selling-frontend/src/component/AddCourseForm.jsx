import React, { useEffect, useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from 'react-toastify' 
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100vw", // Fix IE 11 issue.
      marginTop: theme.spacing(3)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    container: {
      display: "flex !important",
      alignItems: "center !important",
    },
}));

const AddCourseForm = () => {
    const {id} = useParams();
    const [courseId, setCourseId] = useState(0);
    const [courseName, setCourseName] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [coursePrice, setCoursePrice] = useState(0);
    const [isEditMode, setEditMode] = useState();
    const [published, setPublished] = useState(false);
    const [courseImage, setCourseImage] = useState('');
    const classes = useStyles();
    const navigator = useNavigate();
    const REST_API_BASE_URL_ADMIN = "http://localhost:8080/admin";
    const headers = { headers: { Authorization: `Bearer ${localStorage['jwt']}` } }

    useEffect(() => {
        if(id){
            axios.get(REST_API_BASE_URL_ADMIN+"/getCourse/"+id, headers)
            .then((response) => {
                const result = response.data;
                if(result['status'] == 'success'){
                    setCourseId(result.data.courseId);
                    setCourseName(result.data.courseName);
                    setCourseDesc(result.data.courseDesc);
                    setCoursePrice(result.data.coursePrice);
                    setPublished(result.data.published);
                    setCourseImage(result.data.courseImage);
                    setEditMode(true);
                }
            }).catch(err => {
                if(response.status === 403){
                  toast.error("Need to login First");
                }
            })
        }
    }, [id]);


    function saveOrUpdate(e){
        e.preventDefault();
        const CourseDto = {courseId,courseName, courseDesc, coursePrice, courseImage, published};
        console.log(courseImage+" "+courseImage.length)
        if(courseName.length == 0){
            toast.warning("Enter Course Name");
        }else if(courseDesc.length == 0){
            toast.warning("Enter Description");
        }else if(coursePrice == 0){
            toast.warning("Enter Price");
        }else if(courseImage.length > 1024 || courseImage.length == 0){
            toast.warning("Length should not be greater than 1024")
        }else{
            if(id){
                console.log(" inside the if(id) : ");
                axios
                .put(REST_API_BASE_URL_ADMIN+"/updateCourse", CourseDto, headers)
                .then((response) => {
                    const result = response.data;
                    if(result['status'] == 'success'){
                        toast.success("Updated Successfully");
                        navigator("/Admin");
                    }
                    else{
                        toast.error("Falied");
                    }
                }).catch(err => {
                  console.log(err);
                  if(response.status === 403){
                    toast.error("Need to login First");
                  }
                })
            }else{
                axios
                .post(REST_API_BASE_URL_ADMIN+"/addCourse", CourseDto, headers)
                .then((response) => {
                    const result = response.data;
                    if(result['status'] == 'success'){
                        toast.success("Added Successfully");
                        navigator("/Admin");
                    }
                    else{
                        toast.error("Falied");
                    }
                }).catch(err => {
                  console.log(err);
                  if(response.status === 403){
                    toast.error("Need to login First");
                  }
                })
            }
        }
        
    }

    const handleCheckboxChange = (e) => {
        setPublished(e.target.checked);
        console.log(published+" : ");
    };

  return (
    <div style={{justifyContent : 'center'}}>
    <h2 style={{textAlign:'center'}}>Admin Portal</h2>
    <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddCircleSharpIcon color='inherit' />
          </Avatar>
          <Typography component="h1" variant="h5">
            {
                isEditMode ? "Update Course" : "Add Course"
            }
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  type='text'
                  id="courseName"
                  value={courseName}
                  label="Course Name"
                  autoFocus
                  onChange={(e) => {
                    setCourseName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="courseDesc"
                  label="Description"
                  name="courseDesc"
                  autoComplete="desc"
                  type='text'
                  value={courseDesc}
                  onChange={(e) => {
                    setCourseDesc(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="coursePrice"
                  label="Price"
                  name="coursePrice"
                  autoComplete="price"
                  type="number"
                  value={coursePrice}
                  onChange={(e) => {
                    setCoursePrice(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="courseImage"
                  label="Image Link"
                  name="courseImage"
                  autoComplete="link"
                  type="text"
                  value={courseImage}
                  onChange={(e) => {
                    setCourseImage(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                    <FormControlLabel
                        required
                        control={
                            <Checkbox
                                checked={published}
                                onChange={handleCheckboxChange}
                                name="published"
                            />
                    }
                    label="Check if you want to publish"
                    color='secondary'
                    />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveOrUpdate}
            >
              { isEditMode ? 'Update' : 'Add'}
            </Button>
          </form>
        </div>
      </Container>
      </div>
  )
}

export default AddCourseForm
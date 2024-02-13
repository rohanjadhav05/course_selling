import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
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
      width: "100%", // Fix IE 11 issue.
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
    const [courseName, setCourseName] = useState();
    const [courseDesc, setCourseDesc] = useState();
    const [coursePrice, setCoursePrice] = useState(0);
    const [published, setPublished] = useState(false);
    const classes = useStyles();
    const navigator = useNavigate();
    const REST_API_BASE_URL_ADMIN = "http://localhost:8080/admin";
    const headers = { headers: { Authorization: `Bearer ${localStorage['jwt']}` } }

    function saveUser(e){
        e.preventDefault();
        const CourseDto = {courseName, courseDesc, coursePrice, published};
        if(courseName.length == 0){
            toast.warning("Enter Course Name");
        }else if(courseDesc.length == 0){
            toast.warning("Enter Description");
        }else if(coursePrice == 0){
            toast.warning("Enter Price");
        }else{
            axios
            .post(REST_API_BASE_URL_ADMIN+"/addCourse", CourseDto, headers)
            .then((response) => {
                const result = response.data;
                if(result['status'] == 'success'){
                    toast.success("course Add Successfully");
                    navigator("/Admin");
                }
                else{
                    toast.error("Falied");
                }
            }).catch(err => {
                toast.error("Need to Login First");
            })
        }
        
    }

    const handleCheckboxChange = (e) => {
        setPublished(e.target.checked);
        console.log(published+" : ");
    };

  return (
    <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddCircleSharpIcon color='inherit' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Course
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
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
                  name="coursePrice"
                  label="Price"
                  type="number"
                  id="coursePrice"
                  autoComplete="current-password"
                  value={coursePrice}
                  onChange={(e) => {
                    setCoursePrice(e.target.value)
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
                    />
                </Grid>
            </Grid>
            <Button
           ///   type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveUser}
            >
              Add
            </Button>
          </form>
        </div>
      </Container>
  )
}

export default AddCourseForm
import React, { useEffect, useState } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from 'react-toastify'
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

const BuyCourse = () => {
  const {id} = useParams();
  const [courseId, setCourseId] = useState();
  const [courseName, setCourseName] = useState();
  const [courseDesc, setCourseDesc] = useState();
  const [coursePrice, setCoursePrice] = useState(0);
  const classes = useStyles();
  const navigator = useNavigate();
  const REST_API_BASE_URL_USER = "http://localhost:8080/user";
  const headers = { headers: { Authorization: `Bearer ${localStorage['jwt']}` } }

  console.log("id : "+id);

  useEffect(() => {
    if(id){
      axios.get(REST_API_BASE_URL_USER+"/getCourse/"+id, headers)
         .then((response) => {
            const result = response.data;
            console.log()
            if(result['status'] == 'success'){
                setCourseId(result.data.courseId);
                setCourseName(result.data.courseName);
                setCourseDesc(result.data.courseDesc);
                setCoursePrice(result.data.coursePrice);
            }
        }).catch(err => {
            console.log(err);
            if(response.status === 403){
              toast.error("Need to login First");
            }
        })
    }
  }, [id]);

  return (
    <div id="buyCourse" style={{justifyContent : 'center'}}>
      <h2 style={{textAlign:'center'}}>User Portal - Purchase Course</h2>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} justify="center" alignItems="center">
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
            </Grid>
          </form>
          </div>
      </Container>
    </div>
  )
}

export default BuyCourse
import React from 'react';
import { useState} from 'react';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinksMain.js";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  grow: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {
    paddingTop:theme.spacing(15),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function StudentSignIn() {
  const classes = useStyles();
  
  const [first_name,setStudentName] = useState('');
  const [password,setPassword] = useState('');
  const [logstatus,setLogstatus] = useState('');
  const [stop, setStop] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
 
  const  handleToggle = ()=>{
    setOpen(!open);
    Axios.post("http://localhost:3001/student/login",{
      first_name: first_name,
      password: password,
    }).then((response)=> {
      if(response.data.message){
        setLogstatus('page')
      }else{
        setLogstatus('Student')
       
       }
       setStop(false)
        });
   
  }
  
  
  
  return (
    <Container className="main" component="main" maxWidth="xs">
   <CssBaseline />
      <Header
        brand="Student assignment management system"
        rightLinks={<HeaderLinks />}
        fixed
        color="primary"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
       
      />
      <div className={classes.grow} />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Student Signin
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="student"
            label="StudentName"
            name="student"
            autoComplete="student"
            autoFocus
            onChange={(e)=>{ setStudentName(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
           
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{ setPassword(e.target.value)}}
           
          />
          <Grid style ={{paddingLeft:'38%',paddingTop:"10%", paddingBottom:"10%"}}>
        <Button variant="contained" color="primary" onClick={handleToggle}>
        Sigh In
      </Button>
      </Grid>
          {
            stop ?( <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>):
          (
         <Redirect to={`/in/${logstatus}`}/>
          )
          }
        </form>
       
      </div>
     
    </Container>
  );
}


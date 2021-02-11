import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
// import moment, { isMoment } from 'moment';
import { Redirect} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  KeyboardDatePicker,
 MuiPickersUtilsProvider,
} from '@material-ui/pickers';


// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "views/Lecturer/HeaderLinksMainLecturer.js";
const moment = require('moment-timezone');
const useStyles = makeStyles(theme => ({
 
  grow: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  textField: {
    
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1), 
    width: '50%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  Button: {
    
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(1),
   paddingTop: theme.spacing(10),
   paddingBottom: theme.spacing(10),
   paddingLeft: theme.spacing(38),
   
  },
  paper: {
    paddingTop:theme.spacing(8),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
 select: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '47%',
    },
    paddingLeft: theme.spacing(4),
  },
  margin: {
   
    paddingLeft: theme.spacing(7),
    width: '47%',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
 
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  
}));

const Sem = [
    {
      value: 1,
      label: '1 ST SEM',
    },
    {
      value: 2,
      label: '2 ND SEM',
    },
    {
      value: 3,
      label: '3 RD SEM',
    },
    {
      value: 4,
      label: '4 TH SEM',
      
    },
    {
        value: 5,
        label: '5 TH SEM',
        
      },
      {
        value: 6,
        label: '6 TH SEM',
        
      },
      {
        value: 7,
        label: '7 TH SEM',
        
      },
      {
        value: 8,
        label: '8 TH SEM',
        
      },

  ];
  const Branch = [
    {
      value: 1,
      label: 'COMPUTER SCIENCE AND ENGINEERING',
    },
    {
      value: 2,
      label: 'ELECTRONICS COMMUNICATION ENGINEERING',
    },
    {
      value: 3,
      label: 'CIVIL ENGINEERING',
    },
    {
      value: 4,
      label: 'TEXTILE ENGINEERING',
      
    },
  

  ];
  const Assignment = [
    {
      value: 1,
      label: 'Assignment 1',
    },
    {
      value: 2,
      label: 'Assignment 2',
    },
   

  ];


export default function AddAssignment(props) {
  const classes = useStyles();
  const [subject, setSubject] = React.useState('');
  const [first_name, setFirst_name] = React.useState('');
  const [subjectcode, setSubjectcode] = React.useState('');
  const [sem, setSem] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [assignment, setAssignment] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [user,setUser] = React.useState('');
  const [stop, setStop] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
 
  const  handleToggle = ()=>{
    setOpen(!open);
    Axios.post("http://localhost:3001/Lecturer/addAssignment",{
      first_name:first_name,
      subject: subject,
      subjectcode:subjectcode,
      sem:sem,
      branch:branch,
      assignment:assignment,
      description: description,
      Assign_date:Assign_date,
      dateof_submission:dateof_submission,
    }).then((response)=> {
      // setLogstatus(false)
      if(response.data.message){
        setUser('page')
      }else{
        setUser('Lecturer')
       alert('Successful')
       }
       setStop(false)
    });
  }
  const [Assign_date, setAssign_date] = React.useState(moment().format('YYYY-MM-DD'));

  const handleDateChange1 = (date) => {
    var dates = moment(date).format('YYYY-MM-DD');
    setAssign_date(dates);
  };
  const [dateof_submission, setDateof_submission] = React.useState(moment().format('YYYY-MM-DD'));

  const handleDateChange2 = (date) => {
    var dates = moment(date).format('YYYY-MM-DD');
    setDateof_submission(dates);
  };
  // const getsubject = () => {
  //   Axios.get("http://localhost:3001/Lecturer/getsubject").then((response) => {
  //     setSubList(response.data);
  //   });
  // };
  // const [sem, setSem] = React.useState([]);
  // const [branch, setBranch] = React.useState([]);
  
  
  // const handleChangeSem = (event) => {
    
  //   setSem(event.target.value);}
  // const handleChangeBranch = (event) => {
  //      setBranch(event.target.value);
  // };
  // const handleChangeSub = (event) => {
  //   setSub(event.target.value);
  // };
  
     

  return (
    <React.Fragment>
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
          <AccountCircleIcon />
        </Avatar>
     <main className={classes.textField}>
       <Typography variant="h4"  align ='center' gutterBottom>Assign Assignment</Typography>
       <div className={classes.grow} />
       <TextField
          id="subject"
          value={first_name}
          label="Username"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter first name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setFirst_name(e.target.value)}}
        />
       <TextField
          id="subject"
          value={subject}
          label="subject"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter subject"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setSubject(e.target.value)}}
        />
        <TextField
          id="subjectcode"
          label="Subject Code"
          value={subjectcode}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter subject code"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setSubjectcode(e.target.value)}}
        />
        <div style={{paddingLeft:'15px'}}>
         <TextField
          id="outlined-select-currency"
          fullWidth
          select
          label="Sem"
          value={sem}
          onChange={(e)=>{ setSem(e.target.value)}}
          helperText="Please select your sem"
          variant="outlined"
        >
          {Sem.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          fullWidth
          select
          label="Branch"
          value={branch}
          onChange={(e)=>{ setBranch(e.target.value)}}
          helperText="Please select your Branch"
          variant="outlined"
        >
          {Branch.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          fullWidth
          select
          label="Assignment"
          value={assignment}
          onChange={(e)=>{ setAssignment(e.target.value)}}
          helperText="Please select your Assignment"
          variant="outlined"
        >
          {Assignment.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="Assign Date"
          label="Assign Date"
          value={Assign_date}
          onChange={handleDateChange1}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          style={{marginLeft:195}}
          format="MM/dd/yyyy"
          margin="normal"
          id="Date of submission"
          label="Date of submission"
          value={dateof_submission}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
       
        </div>
          <TextField
          id="Description"
          label="Description"
          value={description}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter Description about Assignment"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setDescription(e.target.value)}}
        />
        <Grid style ={{paddingLeft:'45%',paddingTop:"10%", paddingBottom:"10%"}}>
        <Button variant="contained" color="primary" onClick={handleToggle}>
        Add
      </Button>
      </Grid>
          {
            stop ?( <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>):
          (
         <Redirect to={`/in/${user}`}/>
          )
          }
       </main>
      </div>
    </React.Fragment>
  );
        }

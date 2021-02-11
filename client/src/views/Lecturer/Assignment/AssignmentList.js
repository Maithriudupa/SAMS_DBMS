

import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DescriptionIcon from '@material-ui/icons/Description';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DateFnsUtils from '@date-io/date-fns';
// import moment, { isMoment } from 'moment';
import {
  KeyboardDatePicker,
 MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "views/Lecturer/HeaderLinksMainLecturer.js";
const moment = require('moment-timezone');
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStyles = makeStyles(theme => ({
  table: {
    minWidth: '80%',
  },
  grow: {
    flexGrow: 1
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
  container: {
    paddingTop:theme.spacing(8),
    paddingBottom:theme.spacing(8),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
 select: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '47%',
    },
    paddingLeft: theme.spacing(4),
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


export default function AssignmentListLecturer(props) {
  
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [subject, setSubject] = React.useState('');
  const [first_name, setFirst_name] = React.useState('');
  const [subjectcode, setSubjectcode] = React.useState('');
  const [sem, setSem] = React.useState();
  const [branch, setBranch] = React.useState();
  const [assignment, setAssignment] = React.useState();
  const [description, setDescription] = React.useState('');
  const [AssignmentList, setAssignmentList] = React.useState([]);
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
  const getAssignment = ()=>{
    Axios.get("http://localhost:3001/Lecturer/getAssignmentAssignedByMe",{
      params:{
      first_name:first_name
      }
      
    }).then((response)=> {
      if(response.data.message){
        alert(response.data.message)
      }else{
      console.log(response.data)
     setAssignmentList(response.data)
    }
    
    });
  }

  const updateAssignment= (subject_id)=>{
  
    Axios.put("http://localhost:3001/Lecturer/updateAssignment",{
      
      subject_id:subject_id,
      subject: subject,
      subjectcode:subjectcode,
      sem:sem,
      branch:branch,
      assignment:assignment,
      description: description,
      Assign_date:Assign_date,
      dateof_submission:dateof_submission,
      
     
    }).then((response)=> {
        console.log(response.data)
     alert('Updated');
    });
  }
  
 

 
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
     <div className={classes.container}>
      <Avatar className={classes.avatar}>
          <DescriptionIcon />
        </Avatar>
     <main >
       <Typography variant="h4"  align ='center' gutterBottom>Assignments</Typography>
       <div className={classes.grow} />
       
       <TextField
          id="Lecturer"
          value={first_name}
          label="LecturerName"
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
        <div style={{paddingLeft:'15px'}}>
        
        </div>
       
       
       <div style={{paddingLeft:"40%"}}>
       <Button   variant="contained"  color="primary" onClick={getAssignment} >
       
         Submit
        
       </Button>
       </div>
       </main>
      </div>
      <div style={{  
   
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center'}} >
   {AssignmentList.map((val) => (
     <>
     <br/>
       <TableContainer component={Paper} style={{ maxWidth: '90%', alignItems: 'center',}}>
       <Table  aria-label="simple table">
         <TableHead>
           <TableRow>
             <StyledTableCell></StyledTableCell>
           <StyledTableCell align="center">Subject</StyledTableCell>
             <StyledTableCell align="center">Student code</StyledTableCell>
             <StyledTableCell align="center">sem</StyledTableCell>
             <StyledTableCell align="center">Branch</StyledTableCell>
             <StyledTableCell align="center">Assignment</StyledTableCell>
             <StyledTableCell align="center">Assign Date</StyledTableCell>
             <StyledTableCell align="center">Due Date</StyledTableCell>
             <StyledTableCell align="center">Description</StyledTableCell>
            
           </TableRow>
         </TableHead>
                 <TableBody>
             <TableRow className={classes.root}>
             <StyledTableCell>
           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
           </IconButton>
           </StyledTableCell>
        
        
                <StyledTableCell component="th" align="center" scope="row">
                {val.subject}
                </StyledTableCell>
                <StyledTableCell align="center">{val.subject_code}
               </StyledTableCell>
               <StyledTableCell align="center">{val.sem}
               </StyledTableCell>
               <StyledTableCell align="center">{val.branch}
               </StyledTableCell>
               <StyledTableCell align="center">{val.assignment}
               </StyledTableCell>
               <StyledTableCell align="center">{val.Assign_date}
               </StyledTableCell>
               <StyledTableCell align="center">{val.dateof_submission}
               </StyledTableCell>
               <StyledTableCell align="center">{val.description}
               </StyledTableCell>
       </TableRow>
       </TableBody>
       <TableRow>
       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
         <Collapse in={open} timeout="auto" unmountOnExit>
           <Box margin={1}>
           <Typography variant="h6" gutterBottom component="div">
               Update
             </Typography>
             <Grid>
              
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
       
        <Button variant="contained" color="primary" onClick={()=>{updateAssignment(val.subject_id)}} >
          Update
        </Button>
        </Grid>
           </Box>
         </Collapse>
       </TableCell>
     </TableRow>
         </Table>
   </TableContainer>
       </>
       ))}
      </div>
   
     
       
      
    </React.Fragment>
  );
        }
      
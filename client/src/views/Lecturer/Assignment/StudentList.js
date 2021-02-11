

import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

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


// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "views/Lecturer/HeaderLinksMainLecturer.js"

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
    paddingBottom:theme.spacing(6),
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
  paper_table: {
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
  


export default function AssignmentList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [first_name, setFirst_name] = React.useState('');
  const [sem, setSem] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [AssignmentList, setAssignmentList] = React.useState([]);
  
  const getAssignment = ()=>{
    Axios.get("http://localhost:3001/Lecturer/getStudentList",{
      params:{
        sem:sem,
      branch:branch,
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
  const updateGrade = (upload_id)=>{
    console.log(grade)
    Axios.put("http://localhost:3001/Lecturer/updateStudentList",{
      upload_id:upload_id,
      Grade:grade
      
    }).then((response)=> {
      if(response.data.err){
        alert(response.data.err)
      }
      console.log(response.data)
     alert('Successful')
    
    
    });
  }

  const viewAssignment = (filePath)=>{
   
    Axios.get(`http://localhost:3001/student/viewAssignment`,{
      params:{
        filePath:filePath
      },
      
      responseType: "blob"
      //Force to receive data in a Blob Format
    })
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(error => {
        console.log(error);
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
        <TableContainer component={Paper} style={{ maxWidth: '70%', alignItems: 'center',}}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Student</StyledTableCell>
              <StyledTableCell align="center">Assignment</StyledTableCell>
              <StyledTableCell align="center">Submition Date</StyledTableCell>
              <StyledTableCell align="center">Grade out of 10</StyledTableCell>
             
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
                 <StyledTableCell align="center">{val.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">{val.uploadAssignment}
                </StyledTableCell>
                <StyledTableCell align="center">{val.dateOfSubmission}
                </StyledTableCell>
                <StyledTableCell align="center">{val.Grade}
                </StyledTableCell>
        </TableRow>
        </TableBody>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
                View
              </Typography>
              <TextField
          id="Grade"
          value={grade}
          label="Grade"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Out of 10"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setGrade(e.target.value)}}
        />
        
         <Button variant="contained" color="primary"  onClick={()=>{updateGrade(val.upload_id)}}>
               Submit
             </Button>
               <Button variant="contained" color="primary"  onClick={()=>{viewAssignment(val.uploadAssignment)}}>
               View Assignment
             </Button>
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
      
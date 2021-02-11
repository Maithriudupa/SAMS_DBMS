


import React, { Fragment, useState } from 'react';
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
import Message from './Message';
import Progress from './Progress';

// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "views/Student/HeaderLinksStudent.js";
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
 


  const AssignmentList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [first_name, setFirst_name] = useState('');
  const dateof_submission = (moment().format('YYYY-MM-DD'));
  const [sem, setSem] = useState('');
  const [branch, setBranch] = useState('');
  const [AssignmentList, setAssignmentList] = useState([]);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await Axios.post('http://localhost:3001/student/uploadAssignment', formData, {
       
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        enctype:"multipart/form-data",
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

    const filePath = res.data.filePath;
      
      setUploadedFile(filePath);
      
      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  
  
  

  const getAssignment = ()=>{
    Axios.get("http://localhost:3001/student/getAssignment",{
      params:{
        sem:sem,
      branch:branch,
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

 const uploadAssignment= (subject)=>{
  console.log(uploadedFile)
    Axios.post("http://localhost:3001/student/insert",{
      first_name:first_name,
      subject: subject,
      upload: uploadedFile,
      dateOfsubmission:dateof_submission,
    }).then((response)=> {
     alert(response.data.message);
    });
  }
  
 

 
return (
    <Fragment>
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
             <StyledTableCell align="center">Subject code</StyledTableCell>
             <StyledTableCell align="center">Assignment</StyledTableCell>
             <StyledTableCell align="center">Lecturer</StyledTableCell>
             <StyledTableCell align="center">Assign Date</StyledTableCell>
             <StyledTableCell align="center">Last Date</StyledTableCell>
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
               <StyledTableCell align="center">{val.assignment}
               </StyledTableCell>
               <StyledTableCell align="center">{val.first_name}
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
                Upload
              </Typography>
              <Grid>
              <TextField
          id="username"
          value={first_name}
          label="Username"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter first name"
          
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setFirst_name(e.target.value)}}
        />
       {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      <Button variant="contained" color="primary"  onClick={()=>{uploadAssignment(val.subject_id)}}>
          Submit
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
   
       
      
    </Fragment>
  );
        }
        export default AssignmentList;
      
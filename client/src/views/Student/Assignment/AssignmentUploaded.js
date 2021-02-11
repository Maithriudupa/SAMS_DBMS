

import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
import HeaderLinks from "views/Student/HeaderLinksStudent.js";

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
    minWidth: 650,
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
 


export default function AssignmentList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [first_name, setFirst_name] = React.useState('');
  
  const [AssignmentList, setAssignmentList] = React.useState([]);
 
  const getmyAssignment = ()=>{
    Axios.get("http://localhost:3001/student/getmyAssignment",{
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
       <Typography variant="h4"  align ='center' gutterBottom>Assignments uploaded by me</Typography>
       <div className={classes.grow} />
       
        
        <div style={{paddingLeft:'25%'}}>
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
       
        </div>
       
       
       <div style={{paddingLeft:"40%"}}>
       <Button   variant="contained"  color="primary" onClick={getmyAssignment} >
       
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
           
             <StyledTableCell align="center">Student</StyledTableCell>
             <StyledTableCell align="center">Subject</StyledTableCell>
             <StyledTableCell align="center">uploaded Assignment</StyledTableCell>
             <StyledTableCell align="center">Date of Submission</StyledTableCell>
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
        
           <StyledTableCell align="center">{val.first_name}
               </StyledTableCell>
                <StyledTableCell component="th" align="center" scope="row">
                {val.subject}
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
              <Grid>
              
       
      
        <Button variant="contained" color="primary"  onClick={()=>{viewAssignment(val.uploadAssignment)}}>
          View Assignment
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
      
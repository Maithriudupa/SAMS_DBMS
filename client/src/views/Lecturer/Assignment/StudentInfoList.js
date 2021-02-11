

import React from 'react';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from 'views/Lecturer/HeaderLinksMainLecturer';

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



export default function StudentInfoList() {
  const classes = useStyles();
  
  const [posts, setPosts]= React.useState([])
 
    const getPosts = async () => {
      try {
    const userPosts = await Axios.get("http://localhost:3001/Admin/student")
        
        console.log(userPosts.data);
         setPosts(userPosts.data)
      
      } catch (err) {
        console.error(err.message);
      }
    };
    React.useEffect(()=>{
        
        getPosts()
    })
    
    


 
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
      <div className={classes.paper}>
     {posts.map((val) => (
        <TableContainer component={Paper} style={{ maxWidth: '80%',}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">SSN</StyledTableCell>
            <StyledTableCell align="center">mail</StyledTableCell>
            <StyledTableCell align="center">Phone Number</StyledTableCell>
            
                   
          </TableRow>
        </TableHead>
                <TableBody>
            <TableRow className={classes.root}>
              
               <StyledTableCell align="center">{val.first_name}
              </StyledTableCell>
              <StyledTableCell align="center">{val.last_name}
              </StyledTableCell>
              <StyledTableCell align="center">{val.usn}
              </StyledTableCell>
              <StyledTableCell align="center">{val.mail}
              </StyledTableCell>
              <StyledTableCell align="center">{val.phonenumber}
              </StyledTableCell>
             
      </TableRow>
      </TableBody>
     
          </Table>
          </TableContainer>
    ))}
      
      </div> 
      
    </React.Fragment>
  );
        }
      



import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
import { withStyles, makeStyles } from '@material-ui/core/styles';

// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from 'views/Admin/HeaderLinksMainAdmin';
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
 


export default function BranchTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [posts, setPosts]= React.useState([])
  const [branch,setBranch] = React.useState('');
    const getPosts = async () => {
      try {
    const userPosts = await Axios.get("http://localhost:3001/Admin/branch")
        
        console.log(userPosts.data);
         setPosts(userPosts.data)
      
      } catch (err) {
        console.error(err.message);
      }
    };
    React.useEffect(()=>{
        
        getPosts()
    })
    const update= (branch_id)=>{
    
      Axios.put("http://localhost:3001/Admin/updatebranch",{
        
        branch_id:branch_id,
        branch: branch,
        
      }).then((response)=> {
          console.log(response.data)
       alert('Updated');
      });
    }

    const Delete = (branch_id)=>{
    
      Axios.put("http://localhost:3001/Admin/deleteAssignment",{
        
        branch_id:branch_id,
       
        
      }).then((response)=> {
          console.log(response.data)
       alert('Deleted');
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
      <div className={classes.paper}>
     {posts.map((val) => (
        <TableContainer component={Paper} style={{ maxWidth: '40%',}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
          <StyledTableCell align="center">Branch Id</StyledTableCell>
            <StyledTableCell align="center">Branch</StyledTableCell>
            <StyledTableCell align="center">Delete row</StyledTableCell>
           
                   
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
                {val.branch_id}
               </StyledTableCell>
               <StyledTableCell align="center">{val.branch}
              </StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" color="primary"  onClick={()=>{Delete(val.branch_id)}} >
          Delete
        </Button>
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
          id="Branch"
          value={branch}
          label="Branch"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter assignment"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setBranch(e.target.value)}}
        />
      
       
        <Button variant="contained" color="primary" onClick={()=>{update(val.branch_id)}} >
          Update
        </Button>
       
        
        </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
          </Table>
          </TableContainer>
    ))}
      
      </div> 
      
    </React.Fragment>
  );
        }
      

import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { Redirect} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinksMain.js";




const Sem = [
  {
    value: 1,
    label: '1 st SEM',
  },
  {
    value: 2,
    label: '2 nd SEM',
  },
  {
    value: 3,
    label: '3 rd SEM',
  },
  {
    value: 4,
    label: '4 th SEM',
  },
  {
    value: 5,
    label: '5 th SEM',
  },
  {
    value: 6,
    label: '6 th SEM',
  },
  {
    value: 7,
    label: '7 th SEM',
  },
  {
    value: 8,
    label: '8 th SEM',
  },
];

const Branch = [
  {
    value: 1,
    label: 'Computer Science And Engineering',
  },
  {
    value: 2,
    label: 'Electronics And COMMUNICATION Engineering',
  },
  {
    value: 3,
    label: 'Civil Engineering',
  },
  {
    value: 4,
    label: 'Texile Engineering ',
  },
  
];

const useStyles = makeStyles(theme => ({
 
  grow: {
    flexGrow: 1
  },
  textField: {
    
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1), 
    width: '50%',
  },
  paper: {
    paddingTop:theme.spacing(8),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  Button: {
    
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(1),
   paddingTop: theme.spacing(10),
   paddingBottom: theme.spacing(10),
   paddingLeft: theme.spacing(38),
   
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  
}));



export default function StudentRegister(props) {
  const classes = useStyles();
  const [first_name, setFirstName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [usn, setUsn] = React.useState('');
  const [password, setPassword] = React.useState('')
  const [logstatus, setLogstatus] = React.useState('')
  const [stop, setStop] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
 
  const  handleToggle = ()=>{
    setOpen(!open);
    Axios.post("http://localhost:3001/student/register",{
      first_name: first_name,
      last_name:last_name,
      mail:mail,
      phonenumber:phonenumber,
      usn:usn,
      sem:sem,
      branch:branch,

      password: password,
    }).then((response)=> {
      if(response.data.message === "User Already exist!"){
        setLogstatus('page')
        alert(response.data.message)
      }else{
      setLogstatus('Student')
      alert(response.data.message)
      }
      setStop(false)
  console.log(response)
    });
  }
  const [sem, setSem] = React.useState('');
  const [branch, setBranch] = React.useState('');

  const handleChangeSem = (event) => {
    setSem(event.target.value);
  };
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };
  
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
     
       <Typography variant="h4"  align ='center' gutterBottom>Student Registration</Typography>
       <div className={classes.grow} />
       
       <TextField
          id="firstName"
          value={first_name}
          label="First Name"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your first name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setFirstName(e.target.value)}}
        />
        <TextField
          id="lastName"
          label="Last Name"
          value={last_name}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your last name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setLastName(e.target.value)}}
        />
         <TextField
          id="usn"
          label="USN"
          value={usn}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your University Seat Number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setUsn(e.target.value)}}
        />
        <TextField
          id="Mail"
          label="Mail"
          value={mail}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your mail Id"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setMail(e.target.value)}}
        />
       
         <TextField
          id="PhoneNumber"
          label="Phone number"
          value={phonenumber}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your Contact Number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setPhonenumber(e.target.value)}}
        />
        <form className={classes.select}  noValidate autoComplete="off">
        
        <TextField
          id="Semester"
          select
          label="Semester"
          value={sem}
          onChange={handleChangeSem}
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
          id="Branch"
          select
          label="Branch"
          value={branch}
          onChange={handleChangeBranch}
          helperText="Please select your Branch"
          variant="outlined"
          
        >
          {Branch.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
       
        </form>

        
        <TextField
          id="Password"
          label="Password"
          value={password}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your Contact Number"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setPassword(e.target.value)}}
        />
       <Link style ={{paddingLeft:'29%'}} href="/Student_SighIn">Do you have account already?Then do sighin</Link>
        <Grid style ={{paddingLeft:'45%',paddingTop:"10%", paddingBottom:"10%"}}>
        <Button variant="contained" color="primary" onClick={handleToggle}>
        Sigh Up
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
       </main>
       </div>
    </React.Fragment>
  );
        }
// className={classes.textField}
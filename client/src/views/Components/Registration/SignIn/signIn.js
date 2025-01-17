import React from 'react';
import { useState} from 'react';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
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

export default function SignIn() {
  const classes = useStyles();
  
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [logstatus,setLogstatus] = useState('');
  // const register = ()=>{
  //   Axios.post("http://localhost:3001/register",{
  //     username: usernameReg,
  //     password: passwordReg,
  //   }).then((response)=> {
  // console.log(response)
  //   });
  // }
  const login = ()=>{
    Axios.post("http://localhost:3001/login",{
      username: username,
      password: password,
    }).then((response)=> {
      if(response.data.message){
        setLogstatus(null)
      }else{
        setLogstatus(response.data[0].username)
       
       }
        });
   
  }
  // useEffect(()=>
  // {
  //   Axios.get('http://localhost:3001/login').then((response)=>
  //   {
  //     if(response.data.loggedIn === true){
    
  //        if(response.data.user[0].username === "Admin"){
  //       setLogstatus("/Admin")
  //     }else if(response.data[0].username === "Lecturer"){
  //       setLogstatus("/Lecturer")
  //     }else{
  //       setLogstatus("/Student")
  //     }
  //     }
  //   })
  
  // },[])
  
  
  
  return (
    <Container className="main" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="User"
            label="Username"
            name="User"
            autoComplete="User"
            autoFocus
            onChange={(e)=>{ setUsername(e.target.value)}}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Confirm"
            onChange={login } 
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            href={`/${logstatus}`}
          >
              Sign In
           
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
       
      </div>
      {/* <Box mt={8}>
       
      </Box> */}
    </Container>
  );
}


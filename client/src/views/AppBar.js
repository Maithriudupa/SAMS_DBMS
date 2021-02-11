import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import {  Route} from 'react-router-dom';
// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinksMain.js";



const useStyles = makeStyles(theme => ({
 
  grow: {
    flexGrow: 1
  },
  textField: {
    
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
   paddingTop: theme.spacing(20),
   paddingLeft: theme.spacing(40),
    width: '75%',
  },
  }));



export default function AppBar(props) {
  const classes = useStyles();
  

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
    
   
       
      
        
      
    </React.Fragment>
  );
        }

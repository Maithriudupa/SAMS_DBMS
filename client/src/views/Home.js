import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';

// core components
import Header from "components/Header/Header.js";

// sections for this page
import HeaderLinks from "components/Header/HeaderLinksMain.js";
import Card from "./Components/Section/Cards";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
}));



export default function Home(props) {
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
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} 
        style={{backgroundColor:"transparent", position:"relative"}}>
           <Container className={classes.cardGrid} maxWidth="md"></Container>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Student Assignment Manaagement System
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is the web application where we have three different usertype Admin, Lecturer and student.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
               
                </Grid>
              
              </Grid>
            </div>
          </Container>
          {props.children}
        </div>
        <Container className={classes.cardGrid} >
          {/* End hero unit */}
         <Card/>
        
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Contact Us
        </Typography>
        <div style={{paddingLeft:'21%'}}>
      <Grid container spacing={3}>
        <Grid item xs>
           <Button 
           target="_blank"
           color="transparent" >
          <GitHubIcon color="primary"/>
      </Button>
        </Grid>
        <Grid item xs>
      <Button 
           target="_blank"
           color="transparent" >
          <MailIcon color="primary"/>
      </Button>
        </Grid>
        <Grid item xs>
          <Button 
           target="_blank"
           color="transparent" >
          <LinkedInIcon size="large" color="primary"/>
      </Button>
        </Grid>
      </Grid>
      </div>
      </footer>
     
     
    </React.Fragment>
  );
}
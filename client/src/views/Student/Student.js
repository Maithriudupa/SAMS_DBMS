
  import React from "react";
  // material-ui components
  import CssBaseline from '@material-ui/core/CssBaseline';
  import { makeStyles } from "@material-ui/core/styles";
  // core components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import Button from "components/CustomButtons/Button.js";
  import Container from '@material-ui/core/Container';
  import Grid from '@material-ui/core/Grid';
  import { cardTitle } from "assets/jss/material-kit-react.js";
  import Header from "components/Header/Header.js";
  
  // // sections for this page
  import HeaderLinks from "./HeaderLinksStudent.js";
  
  const styles = {
    cardTitle,
    textCenter: {
      textAlign: "center"
    },
    textRight: {
      textAlign: "right"
    },
    cardGrid: {
      paddingTop: '150px',
      
    },
    grow: {
          flexGrow: 1
        },
   
  };
  
  const useStyles = makeStyles(styles);
  
  export default function Student(props) {
    const classes = useStyles();
    return(
      <React.Fragment>
      <CssBaseline />
        <Header
          brand="Student assignment management system"
          rightLinks={<HeaderLinks value={props.value} />}
          fixed
          color="primary"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
         
        />
        <div className={classes.grow} />
      <div>
       
         <Container className={classes.cardGrid}>
         <Grid container  direction="row"
          justify="space-around"
          alignItems="center">
        <Card className={classes.textCenter} style={{width: "20rem"}}>
          <CardBody>
            <h4 className={classes.cardTitle}>Assignment List</h4>
            <p>
              List of the Assignment assigned.
            </p>
            <Button href='/in/Student/AssignmentList' color="primary">Enter</Button>
            
          </CardBody>
        </Card>
        <Card className={classes.textCenter} style={{width: "20rem"}}>
          <CardBody>
            <h4 className={classes.cardTitle}>Assignment uploaded</h4>
            <p>
              Assignment uploaded by me.
            </p>
            <Button href="/in/Student/AssignmentUploaded" color="primary">Enter</Button>
          </CardBody>
        </Card>
        
        </Grid>
        </Container>
      
      </div>
      <Container>
         <Grid container  direction="row"
          justify="center"
          alignItems="center">
      <Card className={classes.textCenter} style={{width: "20rem"}}>
          <CardBody>
            <h4 className={classes.cardTitle}>Assignment uploaded</h4>
            <p>
            Lecturer contact Details
            </p>
            <Button href="/in/Student/LecturerINFOList" color="primary">Enter</Button>
          </CardBody>
        </Card>
        
        </Grid>
        </Container>
      </React.Fragment>
    );
    }




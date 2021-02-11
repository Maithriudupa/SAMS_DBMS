
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
import HeaderLinks from "./HeaderLinksMainLecturer.js";

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

export default function Lecturer(props) {
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
        justify="space-between"
        alignItems="center">
      <Card className={classes.textCenter} style={{width: "20rem"}}>
        <CardBody>
          <h4 className={classes.cardTitle}>Student List</h4>
          <p>
            List of the student who submitted the Assignment Assign by you.
          </p>
          <Button color="primary" href='/in/Lecturer/StudentList'>Enter</Button>
        </CardBody>
      </Card>
      <Card className={classes.textCenter} style={{width: "20rem"}}>
        <CardBody>
          <h4 className={classes.cardTitle}>Add Asssignment</h4>
          <p>
           Assign the Assignment for the respective branch, Sem and Subject.
          </p>
          <Button href='/in/Lecturer/AddAssignment' color="primary">Enter</Button>
        </CardBody>
      </Card>
      <Card className={classes.textCenter} style={{width: "20rem"}}>
        <CardBody>
          <h4 className={classes.cardTitle}>Assignment List</h4>
          <p>
            List of the Assignment of Different subject Assigned by you.
          </p>
          <Button  href='/in/Lecturer/AssignmentList' color="primary">Enter</Button>
        </CardBody>
      </Card>
     
      </Grid>
      </Container>
      
    </div>
    <Container >
       <Grid container  direction="row"
        justify="center"
        alignItems="center">
    <Card className={classes.textCenter} style={{width: "20rem"}}>
        <CardBody>
          <h4 className={classes.cardTitle}>Assignment List</h4>
          <p>
            Student contact details
          </p>
          <Button  href='/in/Lecturer/StudentINFOList' color="primary">Enter</Button>
        </CardBody>
      </Card>
      </Grid>
      </Container>
    {/* <BrowserRouter>
          <Switch>
          
            <Route path='/Admin_SighIn' exact render={()=> <AdminSignIn />}/>
            <Route path='/Lecturer_SighIn' exact render={()=> <LecturerSignIn />}/>
          </Switch>
          </BrowserRouter> */}
    </React.Fragment>
  );
  }
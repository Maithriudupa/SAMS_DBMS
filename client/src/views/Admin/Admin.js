import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from './HeaderLinksMainAdmin';
import Header from "components/Header/Header.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
const styles = {
  cardTitle,
  cardGrid: {
    paddingTop: '150px',
    
  },
};

const useStyles = makeStyles(styles);

export default function Admin() {
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
     <div className={classes.paper}>
     <Container className={classes.cardGrid}>
         <Grid container  direction="row"
          justify="space-around"
          alignItems="center">
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Assignment Table</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Columns in Table are</h4>
        <p>
         assignment_id(Primary key) and assignment
        </p>
        <Button color="primary" href="/in/Admin/assignment">View</Button>
      </CardBody>
    </Card>
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Branch Table</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Columns in Table are</h4>
        <p>
         branch_id (Primary key) and branch
        </p>
        <Button color="primary" href="/in/Admin/branch">View</Button>
      </CardBody>
    </Card>
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Lecturer</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Columns in Table are</h4>
        <p>
         Lecturer_id (Primary key) and first_name, last_name, ssn, phonenumber
        </p>
        <Button color="primary" href="/in/Admin/lecturer">View</Button>
      </CardBody>
    </Card>
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Sem</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Columns in Table are</h4>
        <p>
         sem_id (Primary key) and sem
        </p>
        <Button color="primary" href="/in/Admin/sem">View</Button>
      </CardBody>
    </Card>
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Student</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Columns in Table are</h4>
        <p>
         Student_id (Primary key) and first_name, last_name, usn, phonenumber, branch, sem
        </p>
        <Button color="primary" href="/in/Admin/lecturer">View</Button>
      </CardBody>
    </Card>
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Subject</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>Columns in Table are</h4>
        <p>
         Subject_id (Primary key) and subject, subject_code, sem_id(Foriegn key),branch_id(Foriegn key),
         Assignment_id(Foriegn key), Lecturer_id(Foriegn key), Assign date, submission date, description
        </p>
        <Button color="primary" href="/in/Admin/subject">View</Button>
      </CardBody>
    </Card>
    </Grid>
    </Container>
    </div>
    </React.Fragment>
  );
}
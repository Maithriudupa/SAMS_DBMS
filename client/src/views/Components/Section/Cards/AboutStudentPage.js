import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function CardsStudent() {
  const classes = useStyles();
  return (
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Student page</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>About</h4>
        <p>
          Student can view the Assignment List and Upload thier Assignment
        </p>
        <Button color="primary" href="/Student_SighIn">LogIn</Button>
      </CardBody>
    </Card>
  );
}
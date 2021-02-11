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

export default function CardsAdmin() {
  const classes = useStyles();
  return (
    <Card style={{width: "20rem"}}>
      <CardHeader color="warning">Admin Page</CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>About</h4>
        <p>
          Admin can view, update and delete the table.
        </p>
        <Button color="primary" href="/Admin_SighIn">LogIn</Button>
      </CardBody>
    </Card>
  );
}
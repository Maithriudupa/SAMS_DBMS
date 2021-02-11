import React from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";

// core components
import Button from "components/CustomButtons/Button.js";

import modalStyle from "assets/jss/material-kit-react/modalStyle.js";

import SignIn from "./SignIn/signIn";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(modalStyle);
export default function Registration() {
  const [modal, setModal] = React.useState(false);
  const classes = useStyles();
  return (
     <div>
    <div>
        <Button color="rose" round onClick={() => setModal(true)}>
         Sign In
        </Button>
      </div>
      <Dialog
        classes={{
         
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
       <SignIn/>
      </Dialog>
      </div>
  );
}
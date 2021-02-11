/*eslint-disable*/
import React from "react";


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
// react components for routing our app without refresh
import Link from '@material-ui/core/Link';
import { Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";




// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>

<Button
color="transparent"
target="_blank">
<Link href="/" color="inherit" underline="none">
<HomeIcon/>
Home
</Link>
</Button>
</ListItem>
<ListItem className={classes.listItem}> 
<Button
color="transparent"
 target="_blank"
 >
        <Link href="/" color="inherit" underline="none">
          <DashboardIcon />
        Contact Us
       </Link>
        </Button>
    
     </ListItem>
      <ListItem className={classes.listItem}>
      <CustomDropdown
          noLiPadding
          buttonText="SignIn"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountCircleIcon}
          dropdownList={[
            <Link href="/Admin_SighIn" className={classes.dropdownLink}>
              As Admin
            </Link>,
            <Link href="/Lecturer_SighIn" className={classes.dropdownLink}>
              As Lecturer
            </Link>,
            <Link href="/Student_SighIn" className={classes.dropdownLink}>
            As Student
          </Link>
          ]}
        />
      </ListItem>
      
      <ListItem className={classes.listItem}>
      <CustomDropdown
          noLiPadding
          buttonText="SignUp"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={LockOutlinedIcon}
          dropdownList={[
            <Link href="/Lecturer_Registration" className={classes.dropdownLink}>
              As Lecturer
            </Link>,
            <Link href="/Student_Registration" className={classes.dropdownLink}>
            As Student
          </Link>
          ]}
        />
      </ListItem>
      {/* <ListItem className={classes.listItem}>
       
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}

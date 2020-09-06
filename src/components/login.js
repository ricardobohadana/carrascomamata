import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  List,
  ListItem,
  ListItemIcon,
  // ListItemText,
  Divider,
  // Button,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import MailIcon from "@material-ui/icons/Mail";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Configure FirebaseUI.

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    top: 75,
    position: "fixed",
    width: "40%",
    minWidth: 300,
    backgroundColor: "white",
    // boxShadow: theme.shadows[5],
    padding: 15,
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  fbBtn: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#3b5998",
    color: "#f7f7f7",
    fontSize: "1.16rem",
    "&:hover": {
      backgroundColor: "#3b5998",
    },
    marginTop: 10,
  },
  ggBtn: {
    marginTop: 30,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: "1.16rem",
    color: "white",
    backgroundColor: "#DB4437",
    "&:hover": {
      backgroundColor: "#DB4437",
    },
  },
  paperTitle: {
    fontSize: "1.35rem",
  },
}));

export default function LoginModal(props) {
  const classes = useStyles();
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: `${window.location.pathname}?justLogged=true`,
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <div className={classes.paperTitle}>LOGIN</div>
              </ListItem>
            </List>
            <Divider />
            <div className={classes.btnDiv}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
              {/* <Button
                variant="contained"
                className={classes.fbBtn}
                startIcon={<FacebookIcon />}
              >
                Entrar com Facebook
              </Button>
              <Button
                variant="contained"
                className={classes.ggBtn}
                startIcon={<MailIcon />}
                // onClick={handleGoogleLogin}
              >
                Entrar com Google
              </Button> */}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

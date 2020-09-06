import React from "react";
import "../css/navbar.css";
// import { Link } from "react-router-dom";
import LogoShort from "../images/logoshort.png";
import {
  SwipeableDrawer,
  makeStyles,
  colors,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import LoginModal from "./login";
import AddProfessorModal from "./addProfessor";
import firebase from "firebase";
import CustomAlert from "./customAlert";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: colors.common.white,
  },
  button: {
    padding: 10,
  },
  image: {
    objectFit: "contain",
    maxWidth: "17%",
  },
  list: {
    width: 250,
    backgroundColor: "#116b4f",
    height: "100vh",
  },
  navItem: {
    display: "grid",
    gridAutoFlow: "column",
    placeItems: "center",
  },
}));

export default function CustomNavbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openProf, setOpenProf] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlert2, setOpenAlert2] = React.useState(false);
  const [toggleDrawer, setToggleDrawer] = React.useState(false);
  const [isLogged, setisLogged] = React.useState(false);
  const [username, setUsername] = React.useState(undefined);
  const location = useLocation();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setisLogged(!!user);
      if (user !== null) {
        setUsername(user.displayName);
        let query = new URLSearchParams(location.search);
        if (query.get("justLogged")) {
          handleOpenAlert2();
        }
      }
    });
  }, [location]);

  const handleOpenProf = () => {
    setOpenProf(true);
  };

  const handleCloseProf = () => {
    setOpenProf(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDrawer = () => {
    setToggleDrawer(false);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    setisLogged(false);
    setToggleDrawer(false);
    handleOpenAlert();
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert2 = () => {
    setOpenAlert2(true);
  };

  const handleCloseAlert2 = () => {
    setOpenAlert2(false);
  };
  return (
    <>
      <div className="navbar">
        <div className={`nav-item`}>
          {/* <figure> */}
          <a href="/">
            <img className={classes.image} src={LogoShort} alt="logo" />
          </a>
          {/* </figure> */}
        </div>
        <div className={`nav-item ${classes.navItem}`}>
          <IconButton
            onClick={() => setToggleDrawer(true)}
            className={`${classes.whiteText} ${classes.button}`}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            open={toggleDrawer}
            onOpen={() => {
              setToggleDrawer(true);
            }}
            onClose={() => {
              setToggleDrawer(false);
            }}
          >
            <List className={classes.list}>
              {!isLogged && (
                <ListItem button onClick={handleOpen}>
                  <ListItemIcon className={classes.whiteText}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" className={classes.whiteText} />
                </ListItem>
              )}
              {isLogged && (
                <>
                  <ListItem>
                    <ListItemIcon className={classes.whiteText}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={firebase.auth().currentUser.displayName}
                      className={classes.whiteText}
                    />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon className={classes.whiteText}>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Desconectar"
                      className={classes.whiteText}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={handleOpenProf}>
                    <ListItemIcon className={classes.whiteText}>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Novo Professor"
                      className={classes.whiteText}
                    />
                  </ListItem>
                </>
              )}
            </List>
          </SwipeableDrawer>
        </div>
      </div>
      <LoginModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
      <AddProfessorModal
        handleOpen={handleOpenProf}
        handleClose={handleCloseProf}
        handleCloseDrawer={handleCloseDrawer}
        open={openProf}
      />

      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Sessão Encerrada!"
        carrasco={true}
      />
      <CustomAlert
        open={openAlert2}
        handleClose={handleCloseAlert2}
        handleOpen={handleOpenAlert2}
        message={`Bem vindo, ${username}`}
        carrasco={false}
      />
    </>
  );
}

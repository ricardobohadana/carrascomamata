import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import CustomProgressBar from "./progressbar";
import firebase from "firebase";
import { db } from "../../../backend/firebase";
import CustomAlert from "../../../components/customAlert";

const useStyles = makeStyles((theme) => ({
  buttonCarrasco: {
    backgroundColor: "#ff8565",
    width: "100%",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#fc3603",
    },
  },
  buttonMamata: {
    borderRadius: 0,
    width: "100%",
    color: "white",
    backgroundColor: "#60b8fd",
    "&:hover": {
      backgroundColor: "#008efc",
    },
  },
  mainDiv: {
    display: "flex",
    marginTop: 5,
  },
  innerDiv: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  centerRow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ml: {
    marginLeft: 8,
  },
  mr: {
    marginRight: 8,
  },
}));

export default function MaisInfoVotos(props) {
  const [isLogged, setisLogged] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setisLogged(!!user));
  }, []);

  const onClickCarrasco = () => {
    var updatedVote = {};

    if (isLogged) {
      updatedVote[
        `${props.propertyName}.${firebase.auth().currentUser.uid}`
      ] = true;
      db.collection("professors").doc(props.id).update(updatedVote);
    } else {
      handleOpenAlert();
    }
  };
  const onClickMamata = () => {
    var updatedVote = {};

    if (isLogged) {
      updatedVote[
        `${props.propertyName}.${firebase.auth().currentUser.uid}`
      ] = false;
      db.collection("professors").doc(props.id).update(updatedVote);
    } else {
      handleOpenAlert();
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.outerDiv}>
      <CustomProgressBar
        hardVotes={props.hardVotes}
        easyVotes={props.easyVotes}
      />
      <div className={classes.mainDiv}>
        <Button
          variant="contained"
          className={classes.buttonCarrasco}
          onClick={onClickCarrasco}
        >
          <div className={classes.innerDiv}>
            <div>{props.negativeText}</div>
            <div className={`${classes.ml} ${classes.centerRow}`}>
              <div>{props.hardVotes}</div>
            </div>
          </div>
        </Button>
        <Button
          variant="contained"
          className={classes.buttonMamata}
          onClick={onClickMamata}
        >
          <div className={classes.innerDiv}>
            <div className={`${classes.mr} ${classes.centerRow}`}>
              <div>{props.easyVotes}</div>
            </div>
            <div>{props.positiveText}</div>
          </div>
        </Button>
      </div>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Você precisa fazer login para votar!"
        carrasco={true}
      />
    </div>
  );
}

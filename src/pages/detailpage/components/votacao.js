import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { db } from "../../../backend/firebase";
import firebase from "firebase";
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
  },
}));

export default function Votacao(props) {
  const classes = useStyles();
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
      updatedVote[`difficulty.${firebase.auth().currentUser.uid}`] = true;
      db.collection("professors").doc(props.id).update(updatedVote);
    } else {
      handleOpenAlert();
    }
  };
  const onClickMamata = () => {
    var updatedVote = {};

    if (isLogged) {
      updatedVote[`difficulty.${firebase.auth().currentUser.uid}`] = false;
      db.collection("professors").doc(props.id).update(updatedVote);
    } else {
      handleOpenAlert();
    }
  };

  return (
    <>
      <div className={classes.mainDiv}>
        <Button
          variant="contained"
          className={classes.buttonCarrasco}
          onClick={onClickCarrasco}
        >
          Votar CARRASCO
        </Button>
        <Button
          variant="contained"
          className={classes.buttonMamata}
          onClick={onClickMamata}
        >
          Votar MAMATA
        </Button>
      </div>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Você precisa fazer login para votar!"
        carrasco={true}
      />
    </>
  );
}

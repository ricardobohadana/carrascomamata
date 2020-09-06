import React from "react";
import { makeStyles } from "@material-ui/core";
import LogoMedium from "../../../images/logomedium.png";
import LoginModal from "../../../components/login";
import firebase from "firebase";

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: "center",
    marginBottom: 30,
  },
  fakeBtn: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
export default function AvisoPaper() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLogged, setisLogged] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setisLogged(!!user));
  });

  return (
    <div className={classes.paper}>
      <h1>CHEGOU O NOVO</h1>
      <img src={LogoMedium} alt="" />
      {!isLogged ? (
        <h4 style={{ marginTop: 10 }}>
          <span onClick={handleOpen} className={classes.fakeBtn}>
            Faça login
          </span>{" "}
          e ajude outros universitários adicionando e avaliando professores!
        </h4>
      ) : (
        <h4 style={{ marginTop: 10 }}>
          Ajude-nos e ajude outros universitários adicionando e avaliando
          professores!
        </h4>
      )}
      <LoginModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}

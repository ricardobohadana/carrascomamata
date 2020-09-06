import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, Divider, Grid, IconButton } from "@material-ui/core";
import MaisInformacoes from "./maisInformacoes";
import CarrascoMamata from "./carrascoMamata";
import CloseIcon from "@material-ui/icons/Close";
import { db } from "../../../backend/firebase";
// import firebase from "firebase";

// const professor = {
//   id: "biugdiua90812",
//   name: "Jane Doe",
//   university: "Pontifícia Universidade Católica",
//   abbreviation: "PUC",
//   module: "Teoria da Comunicação I",
//   difficulty: {},
//   attendance: {},
//   worthIt: {},
//   assignment: {},
//   study: {},
//   explanation: {},
// };
const useStyles = makeStyles((theme) => ({
  paperCard: {
    width: "75%",
    minWidth: 300,
    color: "white",
  },
  contentPadding: {
    padding: 15,
  },
  itemName: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  itemDescription: {
    fontSize: "0.8rem",
    fontWeight: "100",
  },
  flexJustifyBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  center: {
    display: "grid",
    placeItems: "center",
    // gridAutoFlow: "column",
  },
  button: {
    color: "white",
    padding: 10,
    backgroundColor: "#3d886f",
    "&:hover": {
      backgroundColor: "#116b4f",
    },
  },
  carrascoBackgroundColor: {
    backgroundColor: "#ff8565",
  },
  mamataBackgroundColor: {
    backgroundColor: "#60b8fd",
  },
  marginTop: {
    marginTop: 10,
  },
  whiteText: {
    color: "white",
  },
}));

function ProfessorPaper(props) {
  const classes = useStyles();
  const [professor, setprofessor] = useState({});

  React.useEffect(() => {
    db.collection("professors")
      .doc(props.match.params.slug)
      .onSnapshot((snapshot) => setprofessor(snapshot.data()));
  }, [props.match.params.slug]);

  if (Object.keys(professor).length > 0) {
    var votes = Object.keys(professor.difficulty).length;
    var easyVotes = Object.values(professor.difficulty).filter(
      (val) => val === false
    ).length;
    var hardVotes = Object.values(professor.difficulty).filter(
      (val) => val === true
    ).length;
    var carrasco = hardVotes > easyVotes;
  }

  return (
    <div className={`${classes.paperCard}`}>
      <div
        className={`${
          carrasco
            ? classes.carrascoBackgroundColor
            : classes.mamataBackgroundColor
        } ${classes.titleBackgroundColor} ${classes.flexJustifyBetween} ${
          classes.contentPadding
        }`}
      >
        <div>
          <div className={classes.itemName}>{professor.name}</div>
          <div className={classes.itemDescription}>{professor.module}</div>
          <div className={classes.itemDescription}>{professor.university}</div>
        </div>
        <IconButton onClick={() => props.history.push("/")}>
          <CloseIcon className={classes.whiteText} />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.marginTop}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {Object.keys(professor).length > 0 && (
              <CarrascoMamata
                id={props.match.params.slug}
                votes={votes}
                hardVotes={hardVotes}
                easyVotes={easyVotes}
                carrasco={carrasco}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {Object.keys(professor).length > 0 && (
              <MaisInformacoes
                professor={professor}
                id={props.match.params.slug}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default withRouter(ProfessorPaper);

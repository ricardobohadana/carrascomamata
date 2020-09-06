import React from "react";
import PaperTitle from "./paperTitle";
import CustomProgressBar from "./progressbar";
import { Paper, makeStyles } from "@material-ui/core";
import Votacao from "./votacao";

const useStyles = makeStyles((theme) => ({
  contentPadding: {
    padding: 15,
    display: "grid",
    placeItems: "center",
  },
  carrasco: {
    backgroundColor: "#ff8565",
  },
  mamata: {
    backgroundColor: "#60b8fd",
  },
  circle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "13rem",
    height: "13rem",
    borderRadius: "50%",
    color: "white",
  },
  percentage: {
    fontSize: "4.5rem",
  },
  description: {
    fontSize: "2rem",
  },
}));

export default function CarrascoMamata(props) {
  const classes = useStyles();
  var percentage;
  if (props.carrasco) {
    percentage = props.votes > 0 ? (100 * props.hardVotes) / props.votes : 0;
  } else {
    percentage = props.votes > 0 ? (100 * props.easyVotes) / props.votes : 0;
  }
  return (
    <Paper square>
      <PaperTitle title="CARRASCO OU MAMATA?" />
      <div className={classes.contentPadding}>
        <div
          className={`${classes.circle} ${
            props.carrasco ? classes.carrasco : classes.mamata
          }`}
        >
          <small className={classes.percentage}>{percentage.toFixed(0)}%</small>
          <div className={classes.description}>
            {props.carrasco ? "CARRASCO" : "MAMATA"}
          </div>
          <div>{props.carrasco ? props.hardVotes : props.easyVotes} votos</div>
        </div>
        <CustomProgressBar
          easyVotes={props.easyVotes}
          hardVotes={props.hardVotes}
        />
      </div>
      <Votacao id={props.id} />
    </Paper>
  );
}

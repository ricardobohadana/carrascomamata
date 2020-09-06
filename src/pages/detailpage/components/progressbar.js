import React from "react";
import { LinearProgress, withStyles } from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    width: "100%",
    marginTop: 10,
    // borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#60b8fd",
  },
  bar: {
    // borderRadius: 5,
    backgroundColor: "#ff8565",
  },
}))(LinearProgress);

export default function CustomProgressBar(props) {
  var totalVotes = props.hardVotes + props.easyVotes;

  var percentageVotes =
    totalVotes === 0 ? 50 : 100 * (props.hardVotes / totalVotes);
  return <BorderLinearProgress variant="determinate" value={percentageVotes} />;
}

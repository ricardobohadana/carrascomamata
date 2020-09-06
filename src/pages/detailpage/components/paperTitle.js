import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleBackground: {
    backgroundColor: "#dcdddf",
  },
  title: {
    color: "#528073",
    fontSize: "1.2rem",
    // fontWeight: "600",
    padding: 15,
  },
}));

export default function PaperTitle(props) {
  const classes = useStyles();
  return (
    <div className={classes.titleBackground}>
      <div className={classes.title}>{props.title}</div>
    </div>
  );
}

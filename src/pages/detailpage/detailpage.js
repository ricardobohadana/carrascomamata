import React from "react";
import { makeStyles } from "@material-ui/core";
import ProfessorPaper from "./components/professorPaper";

const useStyles = makeStyles((theme) => ({
  centerContent: {
    display: "grid",
    placeItems: "center",
  },
}));
export default function Detailpage(props) {
  const classes = useStyles();
  return (
    <div className={classes.centerContent}>
      <ProfessorPaper
        childClassName={` ${classes.flexJustifyBetween} ${classes.contentPadding}`}
        className={`paper-background ${classes.paperCard}`}
      />
    </div>
  );
}

import React from "react";
import { Paper, makeStyles } from "@material-ui/core";
import PaperTitle from "./paperTitle";
import MaisInfoVotos from "./maisInfoVotos";

const useStyles = makeStyles((theme) => ({
  contentPadding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
}));

export default function MaisInformacoes(props) {
  const classes = useStyles();
  const labelVector = {
    Attendance: { goodText: "NÃO COBRA", badText: "COBRA PRESENÇA" },
    WorthIt: { goodText: "VALE A PENA FAZER", badText: "NÃO VALE A PENA" },
    Assignment: { goodText: "NÃO PASSA", badText: "PASSA TRABALHO" },
    Study: { goodText: "ESTUDO DE VÉSPERA", badText: "NOITES VIRADAS" },
    Explanation: { goodText: "EXPLICA BEM", badText: "FALA GREGO" },
  };
  var hardAttendance = Object.values(props.professor.attendance).filter(
    (val) => val === true
  ).length;
  var easyAttendance = Object.values(props.professor.attendance).filter(
    (val) => val === false
  ).length;

  var hardAssignment = Object.values(props.professor.assignment).filter(
    (val) => val === true
  ).length;
  var easyAssignment = Object.values(props.professor.assignment).filter(
    (val) => val === false
  ).length;

  var hardStudy = Object.values(props.professor.study).filter(
    (val) => val === true
  ).length;
  var easyStudy = Object.values(props.professor.study).filter(
    (val) => val === false
  ).length;

  var hardExplanation = Object.values(props.professor.explanation).filter(
    (val) => val === true
  ).length;
  var easyExplanation = Object.values(props.professor.explanation).filter(
    (val) => val === false
  ).length;

  var hardWorthIt = Object.values(props.professor.worthIt).filter(
    (val) => val === true
  ).length;
  var easyWorthIt = Object.values(props.professor.worthIt).filter(
    (val) => val === false
  ).length;

  return (
    <Paper square>
      <PaperTitle title="MAIS INFORMAÇÕES" />

      <div className={classes.contentPadding}>
        <MaisInfoVotos
          id={props.id}
          propertyName="attendance"
          positiveText={labelVector.Attendance.goodText}
          negativeText={labelVector.Attendance.badText}
          hardVotes={hardAttendance}
          easyVotes={easyAttendance}
        />
        <div style={{ marginTop: 17 }}></div>
        <MaisInfoVotos
          id={props.id}
          propertyName="assignment"
          positiveText={labelVector.Assignment.goodText}
          negativeText={labelVector.Assignment.badText}
          hardVotes={hardAssignment}
          easyVotes={easyAssignment}
        />
        <div style={{ marginTop: 17 }}></div>
        <MaisInfoVotos
          id={props.id}
          propertyName="worthIt"
          positiveText={labelVector.WorthIt.goodText}
          negativeText={labelVector.WorthIt.badText}
          hardVotes={hardWorthIt}
          easyVotes={easyWorthIt}
        />
        <div style={{ marginTop: 17 }}></div>
        <MaisInfoVotos
          id={props.id}
          propertyName="study"
          positiveText={labelVector.Study.goodText}
          negativeText={labelVector.Study.badText}
          hardVotes={hardStudy}
          easyVotes={easyStudy}
        />
        <div style={{ marginTop: 17 }}></div>
        <MaisInfoVotos
          id={props.id}
          propertyName="explanation"
          positiveText={labelVector.Explanation.goodText}
          negativeText={labelVector.Explanation.badText}
          hardVotes={hardExplanation}
          easyVotes={easyExplanation}
        />
      </div>
    </Paper>
  );
}

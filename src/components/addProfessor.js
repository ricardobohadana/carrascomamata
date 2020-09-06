import React from "react";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import MailIcon from "@material-ui/icons/Mail";
// import firebase from "firebase";
import { db } from "../backend/firebase";
import { withRouter } from "react-router-dom";
import CustomAlert from "./customAlert";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  padding: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paper: {
    top: 75,
    position: "fixed",
    width: "40%",
    minWidth: 300,
    backgroundColor: "#116b4f",
    // boxShadow: theme.shadows[5],
    padding: 15,
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  input: {
    width: "50%",
    minWidth: 200,
    fontSize: 12,
    border: "none",
    borderRadius: 12,
    "&:hover, &:focus, &:active": {
      border: "none",
      outline: "none",
    },
  },
  paperTitle: {
    fontSize: "1.35rem",
    color: "white",
  },
  marginTopFirst: {
    marginTop: 10,
    color: "white",
  },
  marginTop: {
    marginTop: 25,
    color: "white",
  },
  buttonMamata: {
    marginTop: 25,
    borderRadius: 0,
    width: "75%",
    minWidth: 200,
    color: "white",
    backgroundColor: "#60b8fd",
    "&:hover": {
      backgroundColor: "#ff8565",
    },
  },
}));

function AddProfessorModal(props) {
  const classes = useStyles();

  const [professorName, setprofessorName] = React.useState("");
  const [professorUniversity, setprofessorUniversity] = React.useState("");
  const [professorAbbreviation, setprofessorAbbreviation] = React.useState("");
  const [professorModule, setprofessorModule] = React.useState("");
  const [universities, setUniversities] = React.useState([]);
  const [abbreviations, setAbbreviations] = React.useState([]);

  React.useEffect(() => {
    let abbrsvec = [];
    let univsvec = [];
    db.collection("professors").onSnapshot((snap) => {
      snap.docs.forEach((doc) => {
        !abbrsvec.includes(doc.data().abbreviation) &&
          abbrsvec.push(doc.data().abbreviation);
        !univsvec.includes(doc.data().university) &&
          univsvec.push(doc.data().university);
      });
    });
    setUniversities(univsvec);
    setAbbreviations(abbrsvec);
  }, []);

  const [openAlert, setOpenAlert] = React.useState(false);

  const [openAlert2, setOpenAlert2] = React.useState(false);

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

  const handleAbbrChange = (e, value) => {
    setprofessorAbbreviation(value);
  };
  const handleUnivChange = (e, value) => {
    setprofessorUniversity(value);
  };

  const handleSubmit = () => {
    if (
      professorName &&
      professorUniversity &&
      professorModule &&
      professorAbbreviation
    ) {
      // valores iniciais do objeto
      const initalValues = {
        difficulty: {},
        attendance: {},
        worthIt: {},
        assignment: {},
        study: {},
        explanation: {},
      };
      db.collection("professors")
        .add({
          name: professorName,
          university: professorUniversity,
          abbreviation: professorAbbreviation,
          module: professorModule,
          ...initalValues,
        })
        .then(() => {
          props.history.push("/");
          props.handleClose();
          if (props.handleCloseDrawer) {
            props.handleCloseDrawer();
          }
          handleOpenAlert();
        })
        .catch((err) => console.log(err.message));
    } else {
      handleOpenAlert2();
    }
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AddIcon style={{ color: "white" }} />
                </ListItemIcon>
                <div className={classes.paperTitle}>NOVO PROFESSOR</div>
              </ListItem>
            </List>
            <Divider />
            <div className={classes.btnDiv}>
              <label
                className={`${classes.marginTopFirst}`}
                htmlFor="professorName"
              >
                NOME:
              </label>
              <input
                className={`${classes.padding} ${classes.input}`}
                placeholder="Ex: Fulano de Tal"
                type="text"
                name=""
                id="professorName"
                onChange={(e) => setprofessorName(e.target.value)}
              />
              <label
                className={`${classes.marginTop}`}
                htmlFor="professorUniversity"
              >
                UNIVERSIDADE:
              </label>
              <Autocomplete
                id="professorUniversity"
                classes={{ input: `${classes.padding} ${classes.input}` }}
                options={universities}
                onInputChange={handleUnivChange}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      placeholder="Ex: Universidade Federal do Rio de Janeiro"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />

              <label
                className={`${classes.marginTop}`}
                htmlFor="professorAbbreviation"
              >
                SIGLA DA UNIVERSIDADE:
              </label>
              <Autocomplete
                id="professorAbbreviation"
                classes={{ input: `${classes.padding} ${classes.input}` }}
                options={abbreviations}
                onInputChange={handleAbbrChange}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      placeholder="Ex: UFRJ"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
              <label
                className={`${classes.marginTop}`}
                htmlFor="professorModule"
              >
                DISCIPLINA:
              </label>
              <input
                className={`${classes.padding} ${classes.input}`}
                placeholder="Ex: Economia Politica I"
                type="text"
                name=""
                id="professorModule"
                onChange={(e) => setprofessorModule(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                className={`${classes.buttonMamata}`}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Professor adicionado!"
        carrasco={false}
      />
      <CustomAlert
        open={openAlert2}
        handleClose={handleCloseAlert2}
        handleOpen={handleOpenAlert2}
        message="É necessário preencher todos os campos corretamente!"
        carrasco={true}
      />
    </div>
  );
}

AddProfessorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withRouter(AddProfessorModal);

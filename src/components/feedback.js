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
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { db, auth } from "../backend/firebase";
import { withRouter } from "react-router-dom";
import CustomAlert from "./customAlert";

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
  inputArea: {
    width: "50%",
    minWidth: 200,
    fontSize: 18,
    height: 100,
    border: "none",
    borderRadius: 12,
    "&:hover, &:focus, &:active": {
      border: "none",
      outline: "none",
    },
  },
  input: {
    width: "50%",
    minWidth: 200,
    fontSize: 18,
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

function FeedbackModal(props) {
  const classes = useStyles();

  const [isAnonymous, setIsAnonymous] = React.useState(true);

  const [name, setName] = React.useState("");

  const [feedback, setFeedback] = React.useState("");

  const [openAlert, setOpenAlert] = React.useState(false);

  const [openAlert2, setOpenAlert2] = React.useState(false);

  React.useEffect(() => {
    if (auth.currentUser !== null) {
      setIsAnonymous(true);
    }
  }, []);

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

  const handleSubmit = () => {
    if (isAnonymous) {
      db.collection("feedbacks").add({
        name: "Anônimo",
        message: feedback,
      });
      handleOpenAlert();
      props.handleClose();
    } else {
      if (auth.currentUser === null) {
        if (name) {
          db.collection("feedbacks").add({
            name: name,
            message: feedback,
          });
          handleOpenAlert();
          props.handleClose();
        } else {
          handleOpenAlert2();
        }
      } else {
        db.collection("feedbacks").add({
          name: auth.currentUser.displayName,
          message: feedback,
        });
        handleOpenAlert();
        props.handleClose();
      }
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
                  <FeedbackIcon style={{ color: "white" }} />
                </ListItemIcon>
                <div className={classes.paperTitle}>ENVIAR FEEDBACK</div>
              </ListItem>
            </List>
            <Divider />
            <div className={classes.btnDiv}>
              <FormGroup row>
                <FormControlLabel
                  style={{ color: "white" }}
                  control={
                    <Switch
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      name="isAnonymous"
                      color="secondary"
                    />
                  }
                  label="ANÔNIMO"
                />
              </FormGroup>
              {!isAnonymous && (
                <>
                  <label className={`${classes.marginTopFirst}`} htmlFor="name">
                    NOME:
                  </label>
                  <input
                    className={`${classes.padding} ${classes.input}`}
                    placeholder={
                      auth.currentUser !== null
                        ? auth.currentUser.displayName
                        : "Ex: Fulano de Tal"
                    }
                    type=""
                    name=""
                    id="name"
                    disabled={auth.currentUser !== null}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
              )}

              <label
                className={`${classes.marginTop}`}
                htmlFor="professorModule"
              >
                MENSAGEM:
              </label>
              <textarea
                className={`${classes.padding} ${classes.inputArea}`}
                type="text-area"
                name=""
                id="professorModule"
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Digite aqui sua opinião, ideia, recomendação ou crítica!"
              ></textarea>
              <Button
                onClick={handleSubmit}
                variant="contained"
                className={`${classes.buttonMamata}`}
              >
                ENVIAR
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Feedback enviado!"
        carrasco={false}
      />
      <CustomAlert
        open={openAlert2}
        handleClose={handleCloseAlert2}
        handleOpen={handleOpenAlert2}
        message="Não é possível enviar um feedback sem preencher todos os campos!"
        carrasco={true}
      />
    </div>
  );
}

FeedbackModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withRouter(FeedbackModal);

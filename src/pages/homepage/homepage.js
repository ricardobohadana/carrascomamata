import React from "react";
import {
  makeStyles,
  ListItemText,
  List,
  ListItem,
  Divider,
  Button,
} from "@material-ui/core";
import { db, auth } from "../../backend/firebase";
import AddProfessorModal from "../../components/addProfessor";
import AvisoPaper from "./components/avisoPaper";
import FeedbackModal from "../../components/feedback";

const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: "white",
  },
  padding: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    objectFit: "contain",
    maxWidth: "100%",
  },
  list: {
    width: 250,
    backgroundColor: "#116b4f",
    height: "100vh",
  },
  marginTop: {
    marginTop: 40,
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "50%",
    minWidth: 300,
    fontSize: 12,
    border: "none",
    borderRadius: 12,
    "&:hover, &:focus, &:active": {
      border: "none",
      outline: "none",
    },
  },
  afterInput: {
    width: "50%",
    minWidth: 300,
    fontSize: 12,
    border: "none",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    "&:hover, &:focus, &:active": {
      border: "none",
      outline: "none",
    },
  },
  searchDiv: {
    maxHeight: 260,
    overflow: "auto",
    width: "50%",
    fontSize: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "white",
    color: "darkgrey",
    minWidth: 300,
  },
  buttonMamata: {
    borderRadius: 0,
    width: "25%",
    minWidth: 200,
    color: "white",
    backgroundColor: "#60b8fd",
    "&:hover": {
      backgroundColor: "#ff8565",
    },
  },
  feedbackDiv: {
    marginTop: 60,
    marginBottom: 7,
    width: "100%",
    textAlign: "center",
  },
}));

export default function Homepage(props) {
  const classes = useStyles();

  const [isLogged, setisLogged] = React.useState(false);
  const [professors, setprofessors] = React.useState([]);
  const [openProf, setOpenProf] = React.useState(false);
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [searchObject, setSearchObject] = React.useState([]);

  const handleOpenProf = () => {
    setOpenProf(true);
  };

  const handleCloseProf = () => {
    setOpenProf(false);
  };

  const handleOpenFeedback = () => {
    setOpenFeedback(true);
  };

  const handleCloseFeedback = () => {
    setOpenFeedback(false);
  };

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => setisLogged(!!user));
    db.collection("professors").onSnapshot((snapshot) => {
      setprofessors(
        snapshot.docs.map((doc) => {
          return { id: doc.id, professor: doc.data() };
        })
      );
    });
    return () => {};
  }, []);

  const handleSearchTextChange = (e) => {
    let srchtxt = e.target.value.toLowerCase();
    setSearchText(srchtxt);
    setSearchObject(
      professors.filter(({ id, professor }) => {
        return (
          professor.name.toLowerCase().includes(srchtxt) ||
          professor.university.toLowerCase().includes(srchtxt) ||
          professor.abbreviation.toLowerCase().includes(srchtxt) ||
          professor.module.toLowerCase().includes(srchtxt)
        );
      })
    );
  };

  return (
    <div className={`${classes.mainDiv} ${classes.whiteText}`}>
      <AvisoPaper />
      <input
        className={`${classes.padding} ${
          searchText ? classes.afterInput : classes.input
        }`}
        placeholder="Pesquise pelo nome do professor, universidade ou disciplina..."
        type="text"
        name=""
        id="searchInput"
        onChange={handleSearchTextChange}
      />
      {searchText && (
        <div className={`${classes.searchDiv} ${classes.padding}`}>
          <Divider style={{ marginTop: -15 }} />
          <List>
            {searchObject.length > 0 ? (
              searchObject.map(({ id, professor }, index) => {
                return (
                  <ListItem
                    key={id}
                    button
                    onClick={() => props.history.push(`/detalhes/${id}`)}
                  >
                    <ListItemText
                      secondary={`${professor.name} - ${professor.abbreviation} - ${professor.module}`}
                    />
                  </ListItem>
                );
              })
            ) : (
              <ListItem button={isLogged} onClick={handleOpenProf}>
                <ListItemText
                  secondary={
                    isLogged
                      ? "Não encontramos seu professor... Adicione ele clicando aqui!"
                      : "Não encontramos seu professor... Faça login para adicioná-lo!"
                  }
                />
              </ListItem>
            )}
          </List>
        </div>
      )}
      <div className={classes.feedbackDiv}>
        Conte-nos sobre sua experiência com o Carrasco/Mamata! <br /> Opiniões,
        críticas, novas ideias ou funcionalidades são muito bem-vindas!
      </div>
      <Button
        onClick={handleOpenFeedback}
        variant="contained"
        className={`${classes.buttonMamata}`}
      >
        Enviar feedback
      </Button>
      <FeedbackModal
        handleOpen={handleOpenFeedback}
        handleClose={handleCloseFeedback}
        open={openFeedback}
      />
      <AddProfessorModal
        handleOpen={handleOpenProf}
        handleClose={handleCloseProf}
        open={openProf}
      />
    </div>
  );
}

import React, { useContext, useState } from 'react'
import {
  ListItemText,
  List,
  ListItem,
  Divider,
  Button,
  TextField,
} from '@mui/material'
import { styles } from './styles'
import { AddProfessorModal } from '../../components/AddProfessorModal'
import { FeedbackModal } from '../../components/FeedbackModal'
import { AvisoPaper } from './components/AvisoPaper'
import { useNavigate } from 'react-router-dom'
import { Professor, ProfessorObject } from '../../models/professor'
import { userContext } from '../../contexts/UserContext'
import { professorsCollectionReference } from '../../firebase'
import { onSnapshot } from 'firebase/firestore'

export function Home() {
  const navigate = useNavigate()
  const { user } = useContext(userContext)
  const isLogged = !!user
  const [professors, setProfessors] = useState<ProfessorObject[]>([])
  const [openProf, setOpenProf] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchObject, setSearchObject] = useState<ProfessorObject[]>([])

  const handleOpenProf = () => {
    setOpenProf(true)
  }

  const handleCloseProf = () => {
    setOpenProf(false)
  }

  const handleOpenFeedback = () => {
    setOpenFeedback(true)
  }

  const handleCloseFeedback = () => {
    setOpenFeedback(false)
  }

  React.useEffect(() => {
    onSnapshot(professorsCollectionReference, (snapshot) => {
      setProfessors(
        snapshot.docs.map((doc) => {
          return { id: doc.id, professor: doc.data() as Professor }
        }),
      )
    })
  }, [])

  const handleSearchTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const srchtxt = e.target.value.toLowerCase()
    setSearchText(srchtxt)
    setSearchObject(
      professors.filter(({ professor }) => {
        return (
          professor.name.toLowerCase().includes(srchtxt) ||
          professor.university.toLowerCase().includes(srchtxt) ||
          professor.abbreviation.toLowerCase().includes(srchtxt) ||
          professor.module.toLowerCase().includes(srchtxt)
        )
      }),
    )
  }
  const inputSx = searchText ? styles.afterInput : styles.input
  return (
    <div style={{ ...styles.mainDiv, ...styles.whiteText }}>
      <AvisoPaper />

      <TextField
        sx={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          outline: 'none',
          border: 'none',
          width: '50%',
        }}
        variant="filled"
        label="Pesquise pelo nome do professor, universidade ou disciplina..."
        type="text"
        name=""
        autoComplete="off"
        id="searchInput"
        onChange={handleSearchTextChange}
      />
      {searchText && (
        <div style={{ ...styles.searchDiv, ...styles.padding }}>
          <Divider style={{ marginTop: -15 }} />
          <List>
            {searchObject.length > 0 ? (
              searchObject.map(({ id, professor }) => {
                return (
                  <ListItem
                    key={id}
                    button
                    onClick={() => navigate(`/detalhes/${id}`)}
                  >
                    <ListItemText
                      secondary={`${professor.name} - ${professor.abbreviation} - ${professor.module}`}
                    />
                  </ListItem>
                )
              })
            ) : (
              <ListItem onClick={handleOpenProf}>
                <ListItemText
                  secondary={
                    isLogged
                      ? 'Não encontramos seu professor... Adicione ele clicando aqui!'
                      : 'Não encontramos seu professor... Faça login para adicioná-lo!'
                  }
                />
              </ListItem>
            )}
          </List>
        </div>
      )}
      <div style={styles.feedbackDiv}>
        Conte-nos sobre sua experiência com o Carrasco/Mamata! <br /> Opiniões,
        críticas, novas ideias ou funcionalidades são muito bem-vindas!
      </div>
      <Button
        onClick={handleOpenFeedback}
        variant="contained"
        sx={styles.buttonMamata}
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
        handleCloseDrawer={() => console.log('drawer')}
        open={openProf}
      />
    </div>
  )
}

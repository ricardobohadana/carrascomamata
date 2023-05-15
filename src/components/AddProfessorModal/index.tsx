import {
  Autocomplete,
  Backdrop,
  Button,
  Divider,
  Fade,
  FormHelperText,
  List,
  ListItem,
  ListItemIcon,
  Modal,
  TextField,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { styles } from './styles'
import AddIcon from '@mui/icons-material/Add'
import { CustomAlert } from '../CustomAlert'
import { addDoc, onSnapshot } from 'firebase/firestore'
import { professorsCollectionReference } from '../../firebase'
import { Professor } from '../../models/professor'
import { useNavigate } from 'react-router-dom'

const textFieldStyle = {
  backgroundColor: '#fff',
  borderRadius: '6px',
  outline: 'none',
  border: 'none',
  width: '75%',
}

interface AddProfessorProps {
  open: boolean
  handleClose: () => void
  handleOpen: () => void
  handleCloseDrawer: () => void
}

export function AddProfessorModal(props: AddProfessorProps) {
  const [professorName, setprofessorName] = useState('')
  const [professorUniversity, setprofessorUniversity] = useState('')
  const [professorAbbreviation, setprofessorAbbreviation] = useState('')
  const [professorModule, setprofessorModule] = useState('')
  const [universities, setUniversities] = useState<string[]>([])
  const [abbreviations, setAbbreviations] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const abbrsvec: string[] = []
    const univsvec: string[] = []
    onSnapshot(professorsCollectionReference, (snap) => {
      snap.docs.forEach((doc) => {
        const data = doc.data() as Professor
        !abbrsvec.includes(data.abbreviation) &&
          abbrsvec.push(data.abbreviation)
        !univsvec.includes(data.university) && univsvec.push(data.university)
      })
    })
    setUniversities(univsvec)
    setAbbreviations(abbrsvec)
  }, [])

  const [openAlert, setOpenAlert] = useState(false)

  const [openAlert2, setOpenAlert2] = useState(false)

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleOpenAlert2 = () => {
    setOpenAlert2(true)
  }

  const handleCloseAlert2 = () => {
    setOpenAlert2(false)
  }

  const handleAbbrChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setprofessorAbbreviation(value)
  }
  const handleUnivChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    setprofessorUniversity(value)
  }

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
      }

      addDoc(professorsCollectionReference, {
        name: professorName,
        university: professorUniversity,
        abbreviation: professorAbbreviation,
        module: professorModule,
        ...initalValues,
      })
        .then(() => {
          navigate('/')
          props.handleClose()
          if (props.handleCloseDrawer) {
            props.handleCloseDrawer()
          }
          handleOpenAlert()
        })
        .catch((err) => console.log(err.message))
    } else {
      handleOpenAlert2()
    }
  }

  return (
    <div>
      <Modal
        sx={styles.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
      >
        <Fade in={props.open}>
          <div
            style={{
              top: '75px',
              position: 'fixed',
              width: '40%',
              minWidth: '300px',
              backgroundColor: '#116b4f',
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <AddIcon style={{ color: 'white' }} />
                </ListItemIcon>
                <div style={styles.paperTitle}>NOVO PROFESSOR</div>
              </ListItem>
            </List>
            <Divider />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                gap: '1rem',
              }}
            >
              <TextField
                label="Nome"
                variant="filled"
                sx={textFieldStyle}
                autoComplete="off"
                type="text"
                name=""
                id="professorName"
                onChange={(e) => setprofessorName(e.target.value)}
              />
              <Autocomplete
                sx={{ width: '75%' }}
                id="professorUniversity"
                options={universities}
                onInputChange={handleUnivChange}
                renderInput={(params) => (
                  <>
                    <TextField
                      label="Universidade"
                      variant="filled"
                      sx={{ ...textFieldStyle, width: '100%' }}
                      type="text"
                      {...params}
                    />
                    <FormHelperText sx={{ color: 'white', width: '100%' }}>
                      Caso sua universidade não esteja na lista, insira seu nome
                      para criá-la!
                    </FormHelperText>
                  </>
                )}
              />
              <Autocomplete
                id="professorAbbreviation"
                sx={{ width: '75%' }}
                options={abbreviations}
                onInputChange={handleAbbrChange}
                renderInput={(params) => (
                  <>
                    <TextField
                      label="Sigla da Universidade"
                      variant="filled"
                      sx={{ ...textFieldStyle, width: '100%' }}
                      type="text"
                      {...params}
                    />
                    <FormHelperText sx={{ color: 'white', width: '100%' }}>
                      Caso a sigla da universidade não esteja na lista, insira
                      para criá-la!
                    </FormHelperText>
                  </>
                )}
              />
              <TextField
                variant="filled"
                label="Disciplina"
                sx={textFieldStyle}
                type="text"
                name=""
                id="professorModule"
                onChange={(e) => setprofessorModule(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={styles.buttonMamata}
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
  )
}

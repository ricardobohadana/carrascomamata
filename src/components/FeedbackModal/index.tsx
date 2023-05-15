import { useState, useEffect, useContext } from 'react'
import {
  Modal,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  FormControlLabel,
  Button,
  TextField,
  FormHelperText,
  FormLabel,
} from '@mui/material'
import { feedbackCollectionReference } from '../../firebase'
import { CustomAlert } from '../CustomAlert'
import { styles } from './styles'
import { Feedback, VerifiedUser } from '@mui/icons-material'
import { addDoc } from 'firebase/firestore'
import { userContext } from '../../contexts/UserContext'
import { IOSSwitch } from '../IosSwitch'

const textFieldStyle = {
  backgroundColor: '#fff',
  borderRadius: '6px',
  outline: 'none',
  border: 'none',
  width: '75%',
}

interface FeedbackModalProps {
  open: boolean
  handleClose: () => void
  handleOpen: () => void
}

export function FeedbackModal(props: FeedbackModalProps) {
  const { user } = useContext(userContext)
  const isLoggedIn = !!user
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [name, setName] = useState('')
  const [feedback, setFeedback] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [openAlert2, setOpenAlert2] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      setIsAnonymous(true)
    }
  }, [isLoggedIn])

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

  const handleSubmit = () => {
    if (isAnonymous) {
      addDoc(feedbackCollectionReference, {
        name: 'Anônimo',
        message: feedback,
      })
      handleOpenAlert()
      props.handleClose()
    } else {
      if (!isLoggedIn) {
        if (name) {
          addDoc(feedbackCollectionReference, {
            name,
            message: feedback,
          })
          handleOpenAlert()
          props.handleClose()
        } else {
          handleOpenAlert2()
        }
      } else {
        addDoc(feedbackCollectionReference, {
          name: user.displayName,
          message: feedback,
        })
        handleOpenAlert()
        props.handleClose()
      }
    }
  }

  return (
    <div>
      <Modal
        sx={styles.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div
            style={{
              top: '75px',
              position: 'fixed',
              width: '40%',
              minWidth: 300,
              backgroundColor: '#116b4f',
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <Feedback style={{ color: 'white' }} />
                </ListItemIcon>
                <div style={styles.paperTitle}>ENVIAR FEEDBACK</div>
              </ListItem>
            </List>
            <Divider />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '15px',
                gap: '1rem',
              }}
            >
              <FormLabel
                component="legend"
                sx={{ width: '75%', color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Deseja enviar o feedback de forma anônima?
              </FormLabel>
              <div style={{ display: 'flex', width: '75%', color: 'white' }}>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                  }
                  label="Permanecer anônimo"
                />
              </div>
              <FormHelperText sx={{ color: 'white', width: '75%' }}>
                <VerifiedUser style={{ color: 'white', fontSize: '11px' }} />{' '}
                Sua privacidade será respeitada!
              </FormHelperText>
              {!isAnonymous && (
                <TextField
                  sx={textFieldStyle}
                  variant="filled"
                  label="Nome"
                  defaultValue={isLoggedIn ? user.displayName ?? '' : undefined}
                  type=""
                  name=""
                  id="name"
                  disabled={isLoggedIn}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                label="Mensagem"
                multiline
                rows={4}
                variant="filled"
                sx={textFieldStyle}
                name=""
                id="professorModule"
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Digite aqui sua opinião, ideia, recomendação ou crítica!"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={styles.buttonMamata}
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
  )
}

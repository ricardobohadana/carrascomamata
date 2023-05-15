import {
  Modal,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Button,
  TextField,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { styles } from './styles'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase'
import { useContext, useState } from 'react'
import { userContext } from '../../contexts/UserContext'
import { CustomAlert } from '../CustomAlert'

interface LoginModalProps {
  open: boolean
  handleClose: () => void
  handleOpen: () => void
}

export function LoginModal(props: LoginModalProps) {
  const { user, setUser } = useContext(userContext)
  const [openLoginAlert, setOpenLoginAlert] = useState(false)

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
        setOpenLoginAlert(true)
        props.handleClose()
      })
      .catch((err) => console.error(err))
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
              top: 75,
              position: 'fixed',
              width: '40%',
              minWidth: 300,
              backgroundColor: 'rgba(18, 116, 85, 1) ',
              // boxShadow: theme.shadows[5],
              padding: 15,
              borderRadius: '8px',
            }}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon htmlColor="#fff" />
                </ListItemIcon>
                <div style={styles.paperTitle}>LOGIN</div>
              </ListItem>
            </List>
            <Divider />
            <div
              style={{
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Button
                variant="contained"
                sx={styles.ggBtn}
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
              >
                Entrar com Google
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <CustomAlert
        open={openLoginAlert}
        handleClose={() => setOpenLoginAlert(false)}
        handleOpen={() => setOpenLoginAlert(true)}
        message={`Bem vindo, ${user?.displayName}`}
        carrasco={false}
      />
    </div>
  )
}

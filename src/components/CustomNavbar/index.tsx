import { useState, useContext } from 'react'
import './index.css'
import { styles } from './styles'
import LogoShort from '../../assets/logoshort.png'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import {
  Menu,
  AccountCircle,
  Feedback,
  Add,
  ExitToApp,
} from '@mui/icons-material'
import { AddProfessorModal } from '../AddProfessorModal'
import { CustomAlert } from '../CustomAlert'
import { FeedbackModal } from '../FeedbackModal'
import { LoginModal } from '../LoginModal'
import { userContext } from '../../contexts/UserContext'

export function CustomNavbar() {
  const { user, signOut } = useContext(userContext)
  const isLogged = !!user
  const [open, setOpen] = useState(false)
  const [openProf, setOpenProf] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)

  const handleOpenFeedback = () => {
    setOpenFeedback(true)
  }

  const handleCloseFeedback = () => {
    setOpenFeedback(false)
    handleCloseDrawer()
  }

  const handleOpenProf = () => {
    setOpenProf(true)
  }

  const handleCloseProf = () => {
    setOpenProf(false)
    handleCloseDrawer()
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseDrawer = () => {
    setToggleDrawer(false)
  }

  const handleLogout = () => {
    signOut()
    setToggleDrawer(false)
    handleOpenAlert()
  }

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  return (
    <>
      <div className="navbar">
        <div className={`nav-item`}>
          <a href="/">
            <img
              style={{ objectFit: 'contain', maxWidth: '17%' }}
              src={LogoShort}
              alt="logo"
            />
          </a>
        </div>
        <div className="nav-item" style={styles.navItem}>
          <IconButton
            onClick={() => setToggleDrawer(true)}
            sx={{ ...styles.whiteText, ...styles.button }}
          >
            <Menu htmlColor="#fff" />
          </IconButton>
          <SwipeableDrawer
            anchor="right"
            open={toggleDrawer}
            onOpen={() => {
              setToggleDrawer(true)
            }}
            onClose={() => {
              setToggleDrawer(false)
            }}
          >
            <List sx={styles.list}>
              {!isLogged && (
                <ListItemButton onClick={handleOpen}>
                  <ListItemIcon sx={styles.whiteText}>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Login" sx={styles.whiteText} />
                </ListItemButton>
              )}
              {isLogged && (
                <>
                  <ListItemButton>
                    <ListItemIcon sx={styles.whiteText}>
                      {isLogged && user.photoURL ? (
                        <img
                          src={user.photoURL}
                          style={{
                            objectFit: 'contain',
                            height: '25px',
                            borderRadius: 20,
                          }}
                        />
                      ) : (
                        <AccountCircle />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={user?.displayName}
                      sx={styles.whiteText}
                    />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon sx={styles.whiteText}>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Desconectar" sx={styles.whiteText} />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={handleOpenProf}>
                    <ListItemIcon sx={styles.whiteText}>
                      <Add />
                    </ListItemIcon>
                    <ListItemText
                      primary="Novo Professor"
                      sx={styles.whiteText}
                    />
                  </ListItemButton>
                </>
              )}
              <ListItemButton onClick={handleOpenFeedback}>
                <ListItemIcon sx={styles.whiteText}>
                  <Feedback />
                </ListItemIcon>
                <ListItemText primary="Feedback" sx={styles.whiteText} />
              </ListItemButton>
            </List>
          </SwipeableDrawer>
        </div>
      </div>
      <LoginModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
      <AddProfessorModal
        handleOpen={handleOpenProf}
        handleClose={handleCloseProf}
        handleCloseDrawer={handleCloseDrawer}
        open={openProf}
      />

      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Sessão Encerrada!"
        carrasco={true}
      />
      <FeedbackModal
        open={openFeedback}
        handleClose={handleCloseFeedback}
        handleOpen={handleOpenFeedback}
      />
    </>
  )
}

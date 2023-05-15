import React from 'react'
import { styles } from './styles'
import { Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface CustomAlertProps {
  open: boolean
  handleClose: () => void
  handleOpen: () => void
  message: string
  carrasco: boolean
}
export function CustomAlert(props: CustomAlertProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={props.open}
      ContentProps={{
        sx: props.carrasco ? styles.danger : styles.success,
      }}
      autoHideDuration={2500}
      onClose={props.handleClose}
      message={props.message}
      action={
        <React.Fragment>
          <IconButton onClick={props.handleClose}>
            <CloseIcon sx={styles.whiteText} />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

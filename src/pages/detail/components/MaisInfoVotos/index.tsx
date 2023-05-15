import React from 'react'
import { userContext } from '../../../../contexts/UserContext'
import { professorsCollectionReference } from '../../../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { Button } from '@mui/material'
import { CustomAlert } from '../../../../components/CustomAlert'
import { styles } from './styles'
import { ProgressBar } from '../ProgressBar'

interface MaisInfoVotosProps {
  id: string
  propertyName: string
  easyVotes: number
  hardVotes: number
  positiveText: string
  negativeText: string
}

export default function MaisInfoVotos(props: MaisInfoVotosProps) {
  const { user } = React.useContext(userContext)
  const isLogged = !!user
  const [openAlert, setOpenAlert] = React.useState(false)

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const onClickCarrasco = () => {
    const updatedVote: Record<string, boolean> = {}

    if (isLogged) {
      updatedVote[`${props.propertyName}.${user.uid}`] = true
      updateDoc(doc(professorsCollectionReference, props.id), updatedVote)
    } else {
      handleOpenAlert()
    }
  }
  const onClickMamata = () => {
    const updatedVote: Record<string, boolean> = {}

    if (isLogged) {
      updatedVote[`${props.propertyName}.${user.uid}`] = false
      updateDoc(doc(professorsCollectionReference, props.id), updatedVote)
    } else {
      handleOpenAlert()
    }
  }

  return (
    <div>
      <ProgressBar hardVotes={props.hardVotes} easyVotes={props.easyVotes} />
      <div style={styles.mainDiv}>
        <Button
          variant="contained"
          sx={styles.buttonCarrasco}
          onClick={onClickCarrasco}
        >
          <div style={styles.innerDiv}>
            <div>{props.negativeText}</div>
            <div style={{ ...styles.ml, ...styles.centerRow }}>
              <div>{props.hardVotes}</div>
            </div>
          </div>
        </Button>
        <Button
          variant="contained"
          sx={styles.buttonMamata}
          onClick={onClickMamata}
        >
          <div style={styles.innerDiv}>
            <div style={{ ...styles.ml, ...styles.centerRow }}>
              <div>{props.easyVotes}</div>
            </div>
            <div>{props.positiveText}</div>
          </div>
        </Button>
      </div>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Você precisa fazer login para votar!"
        carrasco={true}
      />
    </div>
  )
}

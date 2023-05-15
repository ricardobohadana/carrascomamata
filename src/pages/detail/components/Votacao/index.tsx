import { Button } from '@mui/material'
import React from 'react'
import { CustomAlert } from '../../../../components/CustomAlert'
import { professorsCollectionReference } from '../../../../firebase'
import { userContext } from '../../../../contexts/UserContext'
import { doc, updateDoc } from 'firebase/firestore'

const styles = {
  buttonCarrasco: {
    backgroundColor: '#ff8565',
    width: '100%',
    color: 'white',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#fc3603',
    },
  },
  buttonMamata: {
    borderRadius: 0,
    width: '100%',
    color: 'white',
    backgroundColor: '#60b8fd',
    '&:hover': {
      backgroundColor: '#008efc',
    },
  },
  mainDiv: {
    display: 'flex',
  },
}

interface VotacaoProps {
  id: string
}

export function Votacao(props: VotacaoProps) {
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
      updatedVote[`difficulty.${user.uid}`] = true
      updateDoc(doc(professorsCollectionReference, props.id), updatedVote)
    } else {
      handleOpenAlert()
    }
  }
  const onClickMamata = () => {
    const updatedVote: Record<string, boolean> = {}

    if (isLogged) {
      updatedVote[`difficulty.${user.uid}`] = false
      updateDoc(doc(professorsCollectionReference, props.id), updatedVote)
    } else {
      handleOpenAlert()
    }
  }

  return (
    <>
      <div style={styles.mainDiv}>
        <Button
          variant="contained"
          sx={styles.buttonCarrasco}
          onClick={onClickCarrasco}
        >
          Votar CARRASCO
        </Button>
        <Button
          variant="contained"
          sx={styles.buttonMamata}
          onClick={onClickMamata}
        >
          Votar MAMATA
        </Button>
      </div>
      <CustomAlert
        open={openAlert}
        handleClose={handleCloseAlert}
        handleOpen={handleOpenAlert}
        message="Você precisa fazer login para votar!"
        carrasco={true}
      />
    </>
  )
}

import { IconButton, Divider, Grid, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { professorsCollectionReference } from '../../../../firebase'
import { CarrascoMamata } from '../CarrascoMamata'
import { MaisInformacoes } from '../MaisInformacoes'
import { styles } from './styles'
import { Close } from '@mui/icons-material'
import { doc, onSnapshot } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { Professor } from '../../../../models/professor'

interface ProfessorPaperProps {
  className: string
}

export function ProfessorPaper({ className }: ProfessorPaperProps) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [professor, setProfessor] = useState<Professor>({} as Professor)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const documentReference = doc(professorsCollectionReference, slug)
    onSnapshot(documentReference, (snapshot) => {
      setProfessor(() => {
        setIsLoading(false)
        return snapshot.data() as Professor
      })
    })
  }, [slug])

  if (!isLoading) {
    let carrasco = false
    const votes = Object.keys(professor.difficulty).length
    const easyVotes = Object.values(professor.difficulty).filter(
      (val) => val === false,
    ).length
    const hardVotes = Object.values(professor.difficulty).filter(
      (val) => val === true,
    ).length
    carrasco = hardVotes > easyVotes
    const carrascoStyle = carrasco
      ? styles.carrascoBackgroundColor
      : styles.mamataBackgroundColor
    return (
      <div style={styles.paperCard} className={className}>
        <div
          style={{
            ...carrascoStyle,
            // ...styles.titleBackgroundColor,
            ...styles.flexJustifyBetween,
            ...styles.contentPadding,
          }}
        >
          <div>
            <div style={styles.itemName}>{professor.name}</div>
            <div style={styles.itemDescription}>{professor.module}</div>
            <div style={styles.itemDescription}>{professor.university}</div>
          </div>
          <IconButton onClick={() => navigate('/')}>
            <Close htmlColor={styles.whiteText.color} />
          </IconButton>
        </div>
        <Divider />
        <div style={styles.marginTop}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {Object.keys(professor).length > 0 && (
                <CarrascoMamata
                  id={slug ?? ''}
                  votes={votes}
                  hardVotes={hardVotes}
                  easyVotes={easyVotes}
                  carrasco={carrasco}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {Object.keys(professor).length > 0 && (
                <MaisInformacoes professor={professor} id={slug ?? ''} />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
  return <CircularProgress color="inherit" />
}

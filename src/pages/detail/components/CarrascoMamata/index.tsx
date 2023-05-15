import { Paper } from '@mui/material'
import { styles } from './styles'
import { PaperTitle } from '../PaperTitle'
import { Votacao } from '../Votacao'
import { ProgressBar } from '../ProgressBar'

interface CarrascoMamataProps {
  carrasco: boolean
  votes: number
  hardVotes: number
  easyVotes: number
  id: string
}

export function CarrascoMamata(props: CarrascoMamataProps) {
  let percentage
  if (props.carrasco) {
    percentage = props.votes > 0 ? (100 * props.hardVotes) / props.votes : 0
  } else {
    percentage = props.votes > 0 ? (100 * props.easyVotes) / props.votes : 0
  }

  const circleStyle = props.carrasco ? styles.carrasco : styles.mamata
  return (
    <Paper
      square
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <PaperTitle title="CARRASCO OU MAMATA?" />
      <div style={styles.contentPadding}>
        <div style={{ ...styles.circle, ...circleStyle }}>
          <small style={styles.percentage}>{percentage.toFixed(0)}%</small>
          <div style={styles.description}>
            {props.carrasco ? 'CARRASCO' : 'MAMATA'}
          </div>
          <div>{props.carrasco ? props.hardVotes : props.easyVotes} votos</div>
        </div>
        <ProgressBar easyVotes={props.easyVotes} hardVotes={props.hardVotes} />
      </div>
      <Votacao id={props.id} />
    </Paper>
  )
}

import { ProfessorPaper } from './components/ProfessorPaper'

const styles = {
  centerContent: {
    display: 'grid',
    placeItems: 'center',
  },
}

export function Detail() {
  return (
    <div style={styles.centerContent}>
      <ProfessorPaper className="" />
    </div>
  )
}

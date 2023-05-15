import { LinearProgress, styled } from '@mui/material'

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  width: '100%',
  marginTop: 10,
  backgroundColor: '#60b8fd',
  '& .MuiLinearProgress-bar1Determinate': {
    backgroundColor: '#ff8565',
  },
}))

interface ProgressBarProps {
  hardVotes: number
  easyVotes: number
}

export function ProgressBar(props: ProgressBarProps) {
  const totalVotes = props.hardVotes + props.easyVotes

  const percentageVotes =
    totalVotes === 0 ? 50 : 100 * (props.hardVotes / totalVotes)
  return <BorderLinearProgress variant="determinate" value={percentageVotes} />
}

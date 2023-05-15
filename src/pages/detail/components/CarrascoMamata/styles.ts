import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const styles = {
  contentPadding: {
    padding: '15px',
    display: 'grid',
    placeItems: 'center',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  carrasco: {
    backgroundColor: '#ff8565',
  },
  mamata: {
    backgroundColor: '#60b8fd',
  },
  circle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '13rem',
    height: '13rem',
    borderRadius: '50%',
    color: 'white',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  percentage: {
    fontSize: '4.5rem',
  } as DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  description: {
    fontSize: '2rem',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
}

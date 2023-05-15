import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const styles = {
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
    marginTop: 5,
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  innerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  centerRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  ml: {
    marginLeft: 8,
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  mr: {
    marginRight: 8,
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
}

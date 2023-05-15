import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const styles = {
  paper: {
    textAlign: 'center',
    marginBottom: '30px',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  fakeBtn: {
    cursor: 'pointer',
    color: '#60b8fd',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  professores: {
    color: '#ff8565',
  },
}

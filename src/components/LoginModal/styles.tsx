import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbBtn: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#3b5998',
    color: '#f7f7f7',
    fontSize: '1.16rem',
    '&:hover': {
      backgroundColor: '#3b5998',
    },
    marginTop: 10,
  },
  ggBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '1.16rem',
    color: 'white',
    backgroundColor: '#DB4437',
    '&:hover': {
      backgroundColor: '#bd3d32',
    },
  },
  paperTitle: {
    fontSize: '1.35rem',
    color: '#fff',
  },
}

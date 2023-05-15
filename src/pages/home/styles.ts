import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const styles = {
  whiteText: {
    color: 'white',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  padding: {
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingLeft: '10px',
    paddingRight: '10px',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  image: {
    objectFit: 'contain',
    maxWidth: '100%',
  },
  list: {
    width: '250px',
    backgroundColor: '#116b4f',
    height: '100vh',
  },
  marginTop: {
    marginTop: '40px',
  },
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  input: {
    width: '50%',
    minWidth: '300px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '12px',
    '&:hover, &:focus, &:active': {
      border: 'none',
      outline: 'none',
    },
  },
  afterInput: {
    width: '50%',
    minWidth: '300px',
    fontSize: '12px',
    border: 'none',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    '&:hover, &:focus, &:active': {
      border: 'none',
      outline: 'none',
    },
  },
  searchDiv: {
    maxHeight: '260px',
    overflow: 'auto',
    width: '50%',
    fontSize: '12px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    backgroundColor: 'white',
    color: 'darkgrey',
    minWidth: '300px',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  buttonMamata: {
    borderRadius: '0',
    width: '25%',
    minWidth: '200px',
    color: 'white',
    backgroundColor: '#60b8fd',
    '&:hover': {
      backgroundColor: '#60a8fd',
    },
  },
  feedbackDiv: {
    marginTop: '60px',
    marginBottom: '7px',
    width: '100%',
    textAlign: 'center',
  } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
}

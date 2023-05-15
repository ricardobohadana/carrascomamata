export const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  padding: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    width: '50%',
    minWidth: 200,
    fontSize: 12,
    border: 'none',
    borderRadius: 12,
    '&:hover, &:focus, &:active': {
      border: 'none',
      outline: 'none',
    },
  },
  paperTitle: {
    fontSize: '1.35rem',
    color: 'white',
  },
  marginTopFirst: {
    marginTop: 10,
    color: 'white',
  },
  marginTop: {
    marginTop: 25,
    color: 'white',
  },
  buttonMamata: {
    borderRadius: 0,
    width: '75%',
    minWidth: 200,
    color: 'white',
    backgroundColor: '#60b8fd',
    '&:hover': {
      backgroundColor: '#60a8fd',
    },
  },
}

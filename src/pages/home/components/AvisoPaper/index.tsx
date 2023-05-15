import React from 'react'
import LogoMedium from '../../../../assets/logomedium.png'
import { auth } from '../../../../firebase'
import { styles } from './styles'
import { LoginModal } from '../../../../components/LoginModal'

export function AvisoPaper() {
  const [open, setOpen] = React.useState(false)
  const [isLogged, setisLogged] = React.useState(false)
  const loginLinkRef = React.useRef<HTMLAnchorElement>(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => setisLogged(!!user))
  })

  return (
    <div style={styles.paper}>
      <h1>CHEGOU O NOVO</h1>
      <img src={LogoMedium} alt="" />
      {!isLogged ? (
        <h4 style={{ marginTop: 10 }}>
          <a
            onClick={handleOpen}
            style={styles.fakeBtn}
            ref={loginLinkRef}
            onMouseOver={() =>
              loginLinkRef.current
                ? (loginLinkRef.current.style.textDecoration = 'underline')
                : null
            }
            onMouseLeave={() =>
              loginLinkRef.current
                ? (loginLinkRef.current.style.textDecoration = 'none')
                : null
            }
          >
            Faça login
          </a>{' '}
          e ajude outros universitários adicionando e avaliando{' '}
          <span style={styles.professores}>professores</span>!
        </h4>
      ) : (
        <h4 style={{ marginTop: 10 }}>
          Ajude-nos e ajude outros universitários adicionando e avaliando
          professores!
        </h4>
      )}
      <LoginModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </div>
  )
}

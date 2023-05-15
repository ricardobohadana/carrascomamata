import { User } from 'firebase/auth'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

interface IUserContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  signOut: () => void
}

interface UserContextProviderProps {
  children: ReactNode
}

export const userContext = createContext<IUserContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
})

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  function signOut() {
    auth.signOut()
  }

  const context = { user, setUser, signOut }

  return <userContext.Provider value={context}>{children}</userContext.Provider>
}

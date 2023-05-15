import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { CustomNavbar } from './components/CustomNavbar'
import { UserContextProvider } from './contexts/UserContext'

export function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <CustomNavbar />
        <Router />
      </UserContextProvider>
    </BrowserRouter>
  )
}

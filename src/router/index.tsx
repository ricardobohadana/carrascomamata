import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home'
import { Detail } from '../pages/detail'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalhes/:slug" element={<Detail />} />
    </Routes>
  )
}

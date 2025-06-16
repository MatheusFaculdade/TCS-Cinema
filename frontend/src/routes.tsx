import { Routes, Route } from 'react-router-dom'
import { Filmes } from './pages/movies'
import { Salas } from './pages/rooms'
import { Sessoes } from './pages/sessions'
import { Ingressos } from './pages/tickets'
import { Dashboard } from './pages/dashboard'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/filmes" element={<Filmes />} />
      <Route path="/salas" element={<Salas />} />
      <Route path="/sessoes" element={<Sessoes />} />
      <Route path="/ingressos" element={<Ingressos />} />
    </Routes>
  )
}

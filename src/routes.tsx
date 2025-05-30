import { Routes, Route } from 'react-router-dom'
import { Filmes } from './pages/movies'
import { Salas } from './pages/rooms'
import { Sessoes } from './pages/sessions'
import { Ingressos } from './pages/tickets'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-center mt-5">🎬 Bem-vindo ao Sistema de Cinema</h1>} />
      <Route path="/filmes" element={<Filmes />} />
      <Route path="/salas" element={<Salas />} />
      <Route path="/sessoes" element={<Sessoes />} />
      <Route path="/ingressos" element={<Ingressos />} />
    </Routes>
  )
}

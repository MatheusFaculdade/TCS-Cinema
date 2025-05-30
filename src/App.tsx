import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { Navbar } from './components/Navbar'
import { AppRoutes } from './routes'

function App() {
  useEffect(() => {
    const ultimosIngressos = document.getElementById('ultimos-ingressos')
    const proximasSessoes = document.getElementById('proximas-sessoes')

    if (ultimosIngressos) ultimosIngressos.innerHTML = '<p>Aqui vão os ingressos...</p>'
    if (proximasSessoes) proximasSessoes.innerHTML = '<p>Aqui vão as sessões...</p>'
  }, [])

  return (
    <>
      <Navbar />
        <AppRoutes />
    </>
  )
}

export default App

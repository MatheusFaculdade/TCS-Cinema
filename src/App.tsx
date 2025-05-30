import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { Navbar } from './components/Navbar'

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

      <div className="container mt-4">
        <h1>Dashboard</h1>
        <hr />

        <section className="mt-5">
          <h3>Últimos Ingressos</h3>
          <div id="ultimos-ingressos" className="row g-4"></div>
        </section>

        <section className="mt-5">
          <h3>Próximas Sessões</h3>
          <div id="proximas-sessoes" className="row g-4"></div>
        </section>
      </div>
    </>
  )
}

export default App

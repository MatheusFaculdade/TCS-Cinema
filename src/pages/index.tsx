// src/pages/Dashboard.tsx
import { useEffect, useState } from "react"
import { Sessao } from "../models/Sessao"
import { Ingresso } from "../models/Ingresso"
import { Filme } from "../models/Filme"

interface IngressoCardProps {
  ingresso: Ingresso
  filme: Filme | undefined
  sessao: Sessao | undefined
}

function IngressoCard({ ingresso, filme, sessao }: IngressoCardProps) {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow">
        <div className="card-body">
          <h5 className="card-title">{ingresso.cliente}</h5>
          <p className="card-text">
            Filme: {filme?.title || "Desconhecido"} <br />
            Data: {sessao ? new Date(sessao.dataHora).toLocaleString("pt-BR") : ""} <br />
            CPF: {ingresso.cpf}
          </p>
        </div>
      </div>
    </div>
  )
}

function SessaoCard({ sessao, filme }: { sessao: Sessao; filme: Filme | undefined }) {
  return (
    <div className="col-md-4">
      <div className="card h-100 shadow">
        <div className="card-body">
          <h5 className="card-title">{filme?.title || "Desconhecido"}</h5>
          <p className="card-text">
            Data: {new Date(sessao.dataHora).toLocaleString("pt-BR")} <br />
            Formato: {sessao.formato} <br />
            Idioma: {sessao.idioma} <br />
            Preço: R$ {parseFloat(sessao.preco.toString()).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([])
  const [sessoes, setSessoes] = useState<Sessao[]>([])
  const [filmes, setFilmes] = useState<Filme[]>([])

  useEffect(() => {
    setIngressos(JSON.parse(localStorage.getItem("ingressos") || "[]"))
    setSessoes(JSON.parse(localStorage.getItem("sessoes") || "[]"))
    setFilmes(JSON.parse(localStorage.getItem("filmes") || "[]"))
  }, [])

  const ultimos = [...ingressos].slice(-3).reverse()
  const agora = new Date()
  const futuras = sessoes
    .filter((s) => new Date(s.dataHora) > agora)
    .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
    .slice(0, 3)

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <hr />

      <section className="mt-5">
        <h3>Últimos Ingressos</h3>
        <div className="row g-4">
          {ultimos.length === 0 ? (
            <p>Nenhum ingresso encontrado.</p>
          ) : (
            ultimos.map((ingresso) => {
              const sessao = sessoes.find((s) => s.id === ingresso.sessaoId)
              const filme = filmes.find((f) => f.id === sessao?.filmeId)
              return <IngressoCard key={ingresso.id} ingresso={ingresso} filme={filme} sessao={sessao} />
            })
          )}
        </div>
      </section>

      <section className="mt-5">
        <h3>Próximas Sessões</h3>
        <div className="row g-4">
          {futuras.length === 0 ? (
            <p>Nenhuma sessão futura encontrada.</p>
          ) : (
            futuras.map((sessao) => {
              const filme = filmes.find((f) => f.id === sessao.filmeId)
              return <SessaoCard key={sessao.id} sessao={sessao} filme={filme} />
            })
          )}
        </div>
      </section>
    </div>
  )
}

import { Sessao } from '../../models/Sessao'

interface Props {
  sessao: Sessao
  onEdit: (sessao: Sessao) => void
  onDelete: (id: number) => void
}

export function SessaoCard({ sessao, onEdit, onDelete }: Props) {
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]')
  const salas = JSON.parse(localStorage.getItem('salas') || '[]')

  const filme = filmes.find((f: any) => f.id === sessao.filmeId)
  const sala = salas.find((s: any) => s.id === sessao.salaId)

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow card-sessao">
        <div className="card-body">
          <h5 className="card-title">{filme?.title || 'Filme desconhecido'}</h5>
          <p className="card-text">
            Sala: {sala?.nome || 'Desconhecida'}<br />
            Data: {new Date(sessao.dataHora).toLocaleString('pt-BR')}<br />
            Preço: R$ {parseFloat(sessao.preco.toString()).toFixed(2)}<br />
            Idioma: {sessao.idioma} | Formato: {sessao.formato}
          </p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(sessao.id)}>
              <i className="bi bi-trash-fill"></i>
            </button>
            <button className="btn btn-secondary btn-sm ms-2" onClick={() => onEdit(sessao)}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

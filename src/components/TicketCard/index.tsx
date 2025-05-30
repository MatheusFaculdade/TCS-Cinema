import { Ingresso } from '../../models/Ingresso'

interface Props {
  ingresso: Ingresso
  onEdit: (ingresso: Ingresso) => void
  onDelete: (id: number) => void
}

export function TicketCard({ ingresso, onEdit, onDelete }: Props) {
  const sessoes = JSON.parse(localStorage.getItem('sessoes') || '[]')
  const filmes = JSON.parse(localStorage.getItem('filmes') || '[]')

  const sessao = sessoes.find((s: any) => s.id === ingresso.sessaoId)
  const filme = filmes.find((f: any) => f.id === sessao?.filmeId)

  const dataHoraFormatada = sessao?.dataHora
    ? new Date(sessao.dataHora).toLocaleString('pt-BR')
    : 'Desconhecido'

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow card-ingresso">
        <div className="card-body">
          <h5 className="card-title">{ingresso.cliente}</h5>
          <p className="card-text">
            CPF: {ingresso.cpf}<br />
            Filme: {filme?.title || 'Desconhecido'}<br />
            Sessão: {dataHoraFormatada}
          </p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(ingresso.id)}>
              <i className="bi bi-trash-fill"></i>
            </button>
            <button className="btn btn-secondary btn-sm ms-2" onClick={() => onEdit(ingresso)}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

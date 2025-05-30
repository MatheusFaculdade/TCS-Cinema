import { Sala } from '../../models/Sala'

interface Props {
  sala: Sala
  onEdit: (sala: Sala) => void
  onDelete: (id: number) => void
}

export function SalaCard({ sala, onEdit, onDelete }: Props) {
  const tipo = sala.tipo === '1' ? '2D' : sala.tipo === '2' ? '3D' : 'Desconhecido'

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow card-sala">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{sala.nome}</h5>
            <p className="card-text">{sala.capacidade} lugares • {tipo}</p>
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(sala.id)}>
              <i className="bi bi-trash-fill"></i>
            </button>
            <button className="btn btn-secondary btn-sm ms-2" onClick={() => onEdit(sala)}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

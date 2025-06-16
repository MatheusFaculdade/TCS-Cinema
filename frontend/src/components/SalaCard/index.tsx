import { Sala } from '../../models/Sala'
import { Button } from '../common/Button'
import './style.css' // Importe seu arquivo de estilos, se houver estilos específicos para salaCard

interface Props {
  sala: Sala
  onEdit: (sala: Sala) => void
  onDelete: (id: string) => void
}

export function SalaCard({ sala, onEdit, onDelete }: Props) {
  const tiposSala: Record<string, string> = {
    '1': '2D',
    '2': '3D',
    '3': 'IMAX', // Adicionei um exemplo se tiver mais tipos
    '4': 'XD'
  }
  const tipo = tiposSala[sala.tipo] || 'Desconhecido'

  return (
    <div className="card h-100 shadow-lg border-0 rounded-4 sala-card-custom">
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <h5 className="card-title text-truncate fw-bold mb-2">{sala.nome}</h5>
          <p className="card-text text-secondary mb-1">
            Capacidade: {sala.capacidade} lugares
          </p>
          <p className="card-text text-muted mb-0">
            Tipo: {tipo}
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            text=""
            variant="outline-danger"
            size="md"
            icone="trash-fill"
            onClick={() => onDelete(sala.id)}
          />
          <Button
            text="Editar"
            variant="primary"
            size="md"
            icone="pencil-fill"
            onClick={() => onEdit(sala)}       
          />
        </div>
      </div>
    </div>
  )
}
import { Sessao } from '../../models/Sessao';
import { Button } from '../common/Button';
import './style.css';

interface Props {
  sessao: Sessao;
  onEdit: (sessao: Sessao) => void;
  onDelete: (id: string) => void;
  filmeTitle?: string;
  salaNome?: string;
}

export function SessaoCard({ sessao, onEdit, onDelete, filmeTitle, salaNome }: Props) {
  return (
    <div className="card h-100 shadow-lg border-0 rounded-4 sessao-card-custom">
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <h5 className="card-title fw-bold text-truncate mb-2">{filmeTitle || 'Filme Desconhecido'}</h5>
          <p className="card-text text-secondary mb-1">
            Sala: {salaNome || 'Desconhecida'}
          </p>
          <p className="card-text text-muted mb-1">
            Data/Hora: {new Date(sessao.dataHora).toLocaleString('pt-BR')}
          </p>
          <p className="card-text text-muted mb-1">
            Preço: R$ {parseFloat(sessao.preco.toString()).toFixed(2)}
          </p>
          <p className="card-text text-muted mb-0">
            Idioma: {sessao.idioma}
          </p>
          <p className="card-text text-muted mb-0">
            Formato: {sessao.formato}
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            text=""
            variant="outline-danger"
            size="md"
            icone="trash-fill"
            onClick={() => onDelete(sessao.id)}
          />
          <Button
            text="Editar"
            variant="primary"
            size="md"
            icone="pencil-fill"
            onClick={() => onEdit(sessao)}
          />
        </div>
      </div>
    </div>
  );
}

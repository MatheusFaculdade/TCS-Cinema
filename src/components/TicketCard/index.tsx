import { Ingresso } from '../../models/Ingresso';
import { Button } from '../common/Button';
import './style.css';

interface SessaoComFilme {
  id: string;
  dataHora: string;
  salaId: string;
  filme: {
    id: string;
    title: string;
  };
}

interface Props {
  ingresso: Ingresso;
  onEdit: (ingresso: Ingresso) => void;
  onDelete: (id: string) => void;
  sessao?: SessaoComFilme;
}

export function TicketCard({ ingresso, onEdit, onDelete, sessao }: Props) {
  const dataHoraFormatada = sessao?.dataHora
    ? new Date(sessao.dataHora).toLocaleString('pt-BR')
    : 'Desconhecida';

  const tiposPagamento: Record<number, string> = {
    1: 'Cartão',
    2: 'Pix',
    3: 'Dinheiro',
  };

  const pagamentoTexto = tiposPagamento[ingresso.pagamento] || 'Não Informado';

  return (
    <div className="card h-100 shadow-lg border-0 rounded-4 ticket-card-custom">
      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <h5 className="card-title fw-bold text-truncate mb-2">
            {ingresso.cliente}
          </h5>
          <p className="card-text text-secondary mb-1">
            CPF: {ingresso.cpf}
          </p>
          <p className="card-text text-muted mb-1">
            Filme: {sessao?.filme.title || 'Desconhecido'}
          </p>
          <p className="card-text text-muted mb-1">
            Sessão: {dataHoraFormatada}
          </p>
          <p className="card-text text-muted mb-1">
            Assento: {ingresso.assento || 'N/A'}
          </p>
          <p className="card-text text-muted mb-0">
            Pagamento: {pagamentoTexto}
          </p>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            text=""
            variant="outline-danger"
            size="md"
            icone="trash-fill"
            onClick={() => onDelete(ingresso.id)}
          />
          <Button
            text="Editar"
            variant="primary"
            size="md"
            icone="pencil-fill"
            onClick={() => onEdit(ingresso)}
          />
        </div>
      </div>
    </div>
  );
}

import { Ingresso } from "../models/Ingresso";
import { Sessao } from "../models/Sessao";
import { Filme } from "../models/Filme";

interface IngressoCardProps {
  ingresso: Ingresso;
  filme: Filme | undefined;
  sessao: Sessao | undefined;
}

export function IngressoCard({ ingresso, filme, sessao }: IngressoCardProps) {
  const tiposPagamento: Record<number, string> = {
    1: 'Cartão',
    2: 'Pix',
    3: 'Dinheiro',
  };

  return (
    <div className="col"> {/* Alterado para 'col' para se encaixar no grid externo */}
      <div className="card h-100 shadow-lg border-0 rounded-4 dashboard-card-custom"> {/* Estilo de card consistente */}
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-primary fw-bold mb-2">
              <i className="bi bi-person-fill me-2"></i> {ingresso.cliente}
            </h5>
            <p className="card-text text-muted mb-1">
              <i className="bi bi-credit-card-fill me-2"></i> Pagamento: {tiposPagamento[ingresso.pagamento] || 'Não informado'}
            </p>
            <p className="card-text text-secondary mb-1">
              <i className="bi bi-ticket-fill me-2"></i> Assento: <span className="fw-bold">{ingresso.assento}</span>
            </p>
            <hr className="my-2"/>
            <p className="card-text mb-1">
              <i className="bi bi-film me-2"></i> Filme: <span className="fw-bold">{filme?.title || "Filme Desconhecido"}</span>
            </p>
            {sessao && (
              <p className="card-text mb-1">
                <i className="bi bi-calendar-event-fill me-2"></i> Data/Hora: {new Date(sessao.dataHora).toLocaleString("pt-BR")}
              </p>
            )}
            <p className="card-text text-muted">
              <i className="bi bi-person-vcard-fill me-2"></i> CPF: {ingresso.cpf}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
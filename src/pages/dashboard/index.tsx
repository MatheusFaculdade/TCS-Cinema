import { useEffect, useState } from 'react';
import { Ingresso } from '../../models/Ingresso';
import { Sessao } from '../../models/Sessao';
import { ingressoService } from '../../services/ingressoService';
import { sessaoService } from '../../services/sessaoService';
import { movieService } from '../../services/filmeService';

interface DashboardIngresso extends Ingresso {
  filmeTitulo?: string;
  dataHoraSessao?: string;
}

interface DashboardSessao extends Sessao {
  filmeTitulo?: string;
}

export function Dashboard() {
  const [ultimosIngressos, setUltimosIngressos] = useState<DashboardIngresso[]>([]);
  const [proximasSessoes, setProximasSessoes] = useState<DashboardSessao[]>([]);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const [ingressosRaw, sessoesRaw, filmesRaw] = await Promise.all([
          ingressoService.getAll(),
          sessaoService.getAll(),
          movieService.getAll(),
        ]);

        // Últimos Ingressos
        const ultimos = ingressosRaw
          .slice(-3)
          .reverse()
          .map((ingresso) => {
            const sessao = sessoesRaw.find((s) => s.id === ingresso.sessaoId);
            const filme = filmesRaw.find((f) => f.id === sessao?.filmeId);
            return {
              ...ingresso,
              filmeTitulo: filme?.title || 'Filme Desconhecido',
              dataHoraSessao: new Date(sessao?.dataHora || '').toLocaleString('pt-BR'),
            };
          });

        setUltimosIngressos(ultimos);

        // Próximas Sessões
        const agora = new Date();
        const futuras = sessoesRaw
          .filter((s) => new Date(s.dataHora) > agora)
          .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
          .slice(0, 3)
          .map((sessao) => {
            const filme = filmesRaw.find((f) => f.id === sessao.filmeId);
            return {
              ...sessao,
              filmeTitulo: filme?.title || 'Filme Desconhecido',
            };
          });

        setProximasSessoes(futuras);
      } catch (error) {
        console.error('Erro ao carregar o dashboard:', error);
      }
    }

    carregarDashboard();
  }, []);

  return (
    <div className="container-fluid py-5">
      <h2 className="text-primary fw-bold mb-4">Dashboard do Cinema</h2>
      <hr className="mb-5" />

      {/* Últimos Ingressos */}
      <section className="mb-5">
        <h3 className="text-secondary mb-3">
          <i className="bi bi-ticket-fill me-2"></i> Últimos Ingressos Emitidos
        </h3>
        {ultimosIngressos.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Nenhum ingresso emitido recentemente.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {ultimosIngressos.map((ingresso) => (
              <div className="col" key={ingresso.id}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-truncate">{ingresso.cliente}</h5>
                    <p className="card-text mb-1">
                      <i className="bi bi-film me-1"></i> Filme: {ingresso.filmeTitulo}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-calendar-event me-1"></i> Data/Hora: {ingresso.dataHoraSessao}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-person-fill me-1"></i> CPF: {ingresso.cpf}
                    </p>
                    <p className="card-text mb-0">
                      <i className="bi bi-currency-dollar me-1"></i> Pagamento:{' '}
                      {ingresso.pagamento === 1
                        ? 'Cartão'
                        : ingresso.pagamento === 2
                        ? 'Pix'
                        : 'Dinheiro'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Próximas Sessões */}
      <section>
        <h3 className="text-secondary mb-3">
          <i className="bi bi-clock-fill me-2"></i> Próximas Sessões Agendadas
        </h3>
        {proximasSessoes.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            Nenhuma sessão futura agendada.
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {proximasSessoes.map((sessao) => (
              <div className="col" key={sessao.id}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-truncate">{sessao.filmeTitulo}</h5>
                    <p className="card-text mb-1">
                      <i className="bi bi-calendar-event me-1"></i> Data/Hora:{' '}
                      {new Date(sessao.dataHora).toLocaleString('pt-BR')}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-aspect-ratio me-1"></i> Formato: {sessao.formato}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-translate me-1"></i> Idioma: {sessao.idioma}
                    </p>
                    <p className="card-text mb-0">
                      <i className="bi bi-cash-coin me-1"></i> Preço: R$ {parseFloat(String(sessao.preco)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

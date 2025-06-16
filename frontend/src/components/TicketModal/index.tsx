import { useEffect, useState } from 'react';
import { Ingresso } from '../../models/Ingresso';
import { Sessao } from '../../models/Sessao';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { sessaoService } from '../../services/sessaoService';
import { movieService } from '../../services/filmeService';
import { salaService } from '../../services/salaService'; // Adicionar import do salaService

interface Props {
  show: boolean;
  onClose: () => void;
  onSave: (ingresso: Ingresso) => void;
  ingressoParaEditar?: Ingresso | null;
}

type SessaoComLabel = Sessao & { label: string };

export function TicketModal({ show, onClose, onSave, ingressoParaEditar }: Props) {
  const [sessaoId, setSessaoId] = useState<string>('');
  const [cliente, setCliente] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [assento, setAssento] = useState<string>('');
  const [pagamento, setPagamento] = useState<string>('');
  const [sessoes, setSessoes] = useState<SessaoComLabel[]>([]);

  const tiposPagamento = [
    { value: 1, label: 'Cartão' },
    { value: 2, label: 'Pix' },
    { value: 3, label: 'Dinheiro' },
  ];

  useEffect(() => {
    async function carregarSessoesComLabel() {
      try {
        const [sessoesRes, filmesRes, salasRes] = await Promise.all([
          sessaoService.getAll(),
          movieService.getAll(),
          salaService.getAll() 
        ]);

        const sessoesComFilme = sessoesRes.map(sessao => {
          const filme = filmesRes.find(f => f.id === sessao.filmeId);
          const sala = salasRes.find(s => s.id === sessao.salaId); // Buscar a sala correspondente
          
          const dataHoraFormatada = new Date(sessao.dataHora).toLocaleString('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          
          return {
            ...sessao,
            label: `${filme?.title || 'Filme Desconhecido'} - ${sala?.nome || `Sala ${sessao.salaId}`} - ${dataHoraFormatada}`,
          };
        });

        setSessoes(sessoesComFilme);
      } catch (err) {
        console.error('Erro ao carregar sessões:', err);
        setSessoes([]);
      }
    }

    if (show) {
      carregarSessoesComLabel();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      if (ingressoParaEditar) {
        setSessaoId(ingressoParaEditar.sessaoId);
        setCliente(ingressoParaEditar.cliente);
        setCpf(ingressoParaEditar.cpf);
        setAssento(ingressoParaEditar.assento);
        setPagamento(String(ingressoParaEditar.pagamento));
      } else {
        // Limpar formulário para novo ingresso
        setSessaoId('');
        setCliente('');
        setCpf('');
        setAssento('');
        setPagamento('');
      }
    }
  }, [show, ingressoParaEditar]); // Adicionar 'show' como dependência

  const handleSubmit = () => {
    if (!sessaoId || !cliente || !cpf || !assento || !pagamento) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const ingresso = new Ingresso(
      ingressoParaEditar?.id ?? '',
      sessaoId,
      cliente,
      cpf,
      assento.toUpperCase(),
      parseInt(pagamento)
    );

    onSave(ingresso);
    
    // Limpar formulário após salvar
    setSessaoId('');
    setCliente('');
    setCpf('');
    setAssento('');
    setPagamento('');
    
    onClose();
  };

  // Função para limpar formulário ao fechar
  const handleClose = () => {
    setSessaoId('');
    setCliente('');
    setCpf('');
    setAssento('');
    setPagamento('');
    onClose();
  };

  if (!show) return null;

  return (
    <Modal
      id="modal-ingresso"
      title={ingressoParaEditar ? 'Editar Ingresso' : 'Emitir Novo Ingresso'}
      onClick={handleSubmit}
      onClose={handleClose} // Usar função personalizada
      body={
        <>
          <div className="mb-3">
            <label htmlFor="sessaoSelect" className="form-label fw-bold">Sessão <span className="text-danger">*</span></label>
            <select
              id="sessaoSelect"
              className="form-select form-select-sm"
              value={sessaoId}
              onChange={e => setSessaoId(e.target.value)}
              required
            >
              <option value="">Selecione a Sessão</option>
              {sessoes.length === 0 ? (
                <option disabled>Nenhuma sessão disponível</option>
              ) : (
                sessoes.map(sessao => (
                  <option key={sessao.id} value={sessao.id}>
                    {sessao.label}
                  </option>
                ))
              )}
            </select>
          </div>

          <Input
            id="cliente"
            label="Nome do Cliente"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            required
          />
          <Input
            id="cpf"
            label="CPF"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            required
            type="text"
          />
          <Input
            id="assento"
            label="Assento"
            value={assento}
            onChange={e => setAssento(e.target.value)}
            required
          />

          <div className="mb-3">
            <label htmlFor="pagamentoSelect" className="form-label fw-bold">Tipo de Pagamento <span className="text-danger">*</span></label>
            <select
              id="pagamentoSelect"
              className="form-select form-select-sm"
              value={pagamento}
              onChange={e => setPagamento(e.target.value)}
              required
            >
              <option value="">Selecione o Tipo de Pagamento</option>
              {tiposPagamento.map(tipo => (
                <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
              ))}
            </select>
          </div>
        </>
      }
    />
  );
}
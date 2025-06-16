import { useEffect, useState } from 'react';
import { Sessao } from '../../models/Sessao';
import { sessaoService } from '../../services/sessaoService';
import { SessaoCard } from '../../components/SessaoCard';
import { SessaoModal } from '../../components/SessaoModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import toast from 'react-hot-toast';

interface SessaoComRelacionamentos extends Sessao {
  filme: {
    title: string;
  };
  sala: {
    nome: string;
  };
}


export function Sessoes() {
  const [sessaoEdit, setSessaoEdit] = useState<Sessao | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [sessoes, setSessoes] = useState<SessaoComRelacionamentos[]>([]);

useEffect(() => {
  async function fetchSessoes() {
    try {
      const data = await sessaoService.getAll();
      setSessoes(
        data.map((s: any) => ({
          ...s,
          filme: s.filme ?? { title: '' },
          sala: s.sala ?? { nome: '' },
        }))
      );
    } catch (err) {
      console.error('Erro ao buscar sessões:', err);
    }
  }

  fetchSessoes();
}, []);


  const openModal = (sessao?: Sessao) => {
    setSessaoEdit(sessao ?? null);
    setShowModal(true);
  };

  const handleSave = async (sessao: Sessao) => {
    try {
      if (sessaoEdit) {
        await sessaoService.update(sessao.id, sessao);
      } else {
        await sessaoService.create({
      ...sessao,
        filmeId: String(sessao.filmeId),
        salaId: String(sessao.salaId),
      });
      }

      const data = await sessaoService.getAll();
      setSessoes(
        data.map((s: any) => ({
          ...s,
          filme: s.filme ?? { title: '' },
          sala: s.sala ?? { nome: '' },
        }))
      );
      setShowModal(false);
      toast.success('Sessão salva com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar sessão. Verifique os dados e tente novamente.');
      console.error('Erro ao salvar sessão:', err);
    }
  };

  const handleEdit = (sessao: Sessao) => openModal(sessao);

  const handleDelete = (id: string) => {
    setIdParaExcluir(id);
    setShowConfirm(true);
  };

  const confirmarExclusao = async () => {
    if (idParaExcluir) {
      try {
        await sessaoService.delete(idParaExcluir);
        const data = await sessaoService.getAll();
        setSessoes(
        data.map((s: any) => ({
          ...s,
          filme: s.filme ?? { title: '' },
          sala: s.sala ?? { nome: '' },
        }))
      );
        toast.success('Sessão excluída com sucesso!');
      } catch (err) {
        toast.error("Erro ao excluir sessão. Já possui ingressos relacionados a esta sessão.");
        console.error('Erro ao excluir sessão:', err);
      } finally {
        setShowConfirm(false);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Programação de Sessões</h2>
        <button
          className="btn btn-success btn-lg shadow-sm"
          onClick={() => openModal()}
        >
          <i className="bi bi-plus-circle me-2"></i> Adicionar Nova Sessão
        </button>
      </div>
      <hr className="my-4" />
      {sessoes.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Nenhuma sessão encontrada.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {sessoes.map((s) => (
          <div className="col" key={s.id}>
            <SessaoCard
              sessao={s}
              onEdit={handleEdit}
              onDelete={() => handleDelete(s.id)}
              filmeTitle={s.filme.title}
              salaNome={s.sala.nome}
            />
          </div>
        ))}
        </div>
      )}

      <SessaoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        sessaoParaEditar={sessaoEdit}
      />

      <ConfirmationModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmarExclusao}
        message="Tem certeza que deseja excluir esta sessão?"
      />
    </div>
  );
}

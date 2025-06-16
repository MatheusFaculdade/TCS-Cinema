import { useEffect, useState } from 'react';
import { Ingresso } from '../../models/Ingresso';
import { ingressoService } from '../../services/ingressoService';
import { TicketCard } from '../../components/TicketCard';
import { TicketModal } from '../../components/TicketModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import toast from 'react-hot-toast';

interface IngressoComRelacionamentos extends Ingresso {
  sessao: {
    id: string;
    dataHora: string;
    salaId: string;
    filme: {
      id: string;
      title: string;
    };
  };
}

export function Ingressos() {
  const [ingressos, setIngressos] = useState<IngressoComRelacionamentos[]>([]);
  const [ingressoEdit, setIngressoEdit] = useState<Ingresso | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function carregarIngressos() {
  try {
    const data = await ingressoService.getAll();
    setIngressos(
      (data as IngressoComRelacionamentos[]).map((i) => ({
        ...i,
        sessao: {
          ...i.sessao,
          filme: i.sessao?.filme,
        },
      }))
    );
  } catch (err) {
    console.error('Erro ao buscar ingressos:', err);
  }
}


  useEffect(() => {
    carregarIngressos();
  }, []);

  const openModal = (ingresso?: Ingresso) => {
    setIngressoEdit(ingresso ?? null);
    setShowModal(true);
  };

  const handleSave = async (ingresso: Ingresso) => {
    try {
      if (ingressoEdit) {
        await ingressoService.update(ingresso.id, ingresso);
      } else {
        await ingressoService.create(ingresso);
      }
      await carregarIngressos();
      setShowModal(false);
      toast.success('Ingresso salvo com sucesso!');      
    } catch (err) {
      toast.error('Erro ao salvar ingresso. Tente novamente mais tarde.');
      console.error('Erro ao salvar ingresso:', err);
    }
  };

  const handleEdit = (ingresso: Ingresso) => openModal(ingresso);

  const handleDelete = (id: string) => {
    setIdParaExcluir(id);
    setShowConfirm(true);
  };

  const confirmarExclusao = async () => {
    if (idParaExcluir) {
      try {
        await ingressoService.delete(idParaExcluir);
        await carregarIngressos();
        toast.success('Ingresso excluído com sucesso!');
      } catch (err) {
        toast.error('Erro ao excluir ingresso. Tente novamente mais tarde.');
        console.error('Erro ao excluir ingresso:', err);
      } finally {
        setShowConfirm(false);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gerenciamento de Ingressos</h2>
        <button
          className="btn btn-success btn-lg shadow-sm"
          onClick={() => openModal()}
        >
          <i className="bi bi-plus-circle me-2"></i> Emitir Novo Ingresso
        </button>
      </div>
      <hr className="my-4" />
      {ingressos.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Nenhum ingresso encontrado.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {ingressos.map((i) => (
            <div className="col" key={i.id}>
              <TicketCard
                ingresso={i}
                onEdit={handleEdit}
                onDelete={() => handleDelete(i.id)}
                sessao={i.sessao}
              />
            </div>
          ))}
        </div>
      )}

      <TicketModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        ingressoParaEditar={ingressoEdit}
      />
      <ConfirmationModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmarExclusao}
        message="Tem certeza que deseja excluir este ingresso?"
      />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Ingresso } from '../../models/Ingresso';
import { ingressoService } from '../../services/ingressoService';
import { TicketCard } from '../../components/TicketCard';
import { TicketModal } from '../../components/TicketModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';

export function Ingressos() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [ingressoEdit, setIngressoEdit] = useState<Ingresso | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    async function fetchIngressos() {
      try {
        const data = await ingressoService.getAll();
        setIngressos(data);
      } catch (err) {
        console.error('Erro ao buscar ingressos:', err);
      }
    }

    fetchIngressos();
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

      const data = await ingressoService.getAll();
      setIngressos(data);
      setShowModal(false);
    } catch (err) {
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
        const data = await ingressoService.getAll();
        setIngressos(data);
      } catch (err) {
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
              <TicketCard ingresso={i} onEdit={handleEdit} onDelete={() => handleDelete(i.id)} />
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

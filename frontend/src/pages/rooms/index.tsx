import { useEffect, useState } from 'react';
import { Sala } from '../../models/Sala';
import { salaService } from '../../services/salaService';
import { SalaCard } from '../../components/SalaCard';
import { SalaModal } from '../../components/SalaModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import toast from 'react-hot-toast';

export function Salas() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [salaEdit, setSalaEdit] = useState<Sala | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    async function fetchSalas() {
      try {
        const data = await salaService.getAll();
        setSalas(data);
      } catch (err) {
        console.error('Erro ao buscar salas:', err);
      }
    }

    fetchSalas();
  }, []);

  const openModal = (sala?: Sala) => {
    setSalaEdit(sala ?? null);
    setShowModal(true);
  };

  const handleSave = async (sala: Sala) => {
    try {
      if (salaEdit) {
        await salaService.update(sala.id, sala);
      } else {
        await salaService.create(sala);
      }

      const data = await salaService.getAll();
      setSalas(data);
      setShowModal(false);
      toast.success('Sala salva com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar sala. Tente novamente mais tarde.');
      console.error('Erro ao salvar sala:', err);
    }
  };

  const handleEdit = (sala: Sala) => openModal(sala);

  const handleDelete = (id: string) => {
    setIdParaExcluir(id);
    setShowConfirm(true);
  };

  const confirmarExclusao = async () => {
    if (idParaExcluir) {
      try {
        await salaService.delete(idParaExcluir);
        const data = await salaService.getAll();
        setSalas(data);
        toast.success('Sala excluída com sucesso!');
      } catch (err) {
        console.error('Erro ao excluir sala:', err);
        toast.error('Erro ao excluir sala. Tente novamente mais tarde.');
      } finally {
        setShowConfirm(false);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestão de Salas de Cinema</h2>
        <button
          className="btn btn-success btn-lg shadow-sm"
          onClick={() => openModal()}
        >
          <i className="bi bi-plus-circle me-2"></i> Adicionar Nova Sala
        </button>
      </div>
      <hr className="my-4" />
      {salas.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Nenhuma sala encontrada.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {salas.map((s) => (
            <div className="col" key={s.id}>
              <SalaCard sala={s} onEdit={handleEdit} onDelete={() => handleDelete(s.id)} />
            </div>
          ))}
        </div>
      )}

      <SalaModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        salaParaEditar={salaEdit}
      />
      <ConfirmationModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmarExclusao}
        message="Tem certeza que deseja excluir esta sala?"
      />
    </div>
  );
}

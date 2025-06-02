import { useEffect, useState } from 'react';
import { Sala } from '../../models/Sala';
import { getAllSalas, saveSalas } from '../../services/salaService';
import { SalaCard } from '../../components/SalaCard';
import { SalaModal } from '../../components/SalaModal';
import { ConfirmationModal } from '../../components/ConfirmationModal';

export function Salas() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [salaEdit, setSalaEdit] = useState<Sala | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setSalas(getAllSalas());
  }, []);

  const openModal = (sala?: Sala) => {
    setSalaEdit(sala ?? null);
    setShowModal(true);
  };

  const handleSave = (sala: Sala) => {
    const novaLista = salaEdit
      ? salas.map(s => (s.id === sala.id ? sala : s))
      : [...salas, { ...sala, id: salas.length > 0 ? Math.max(...salas.map(s => s.id)) + 1 : 1 }]; // Gera um ID simples
    setSalas(novaLista);
    saveSalas(novaLista);
    setShowModal(false); // Fechar o modal após salvar
  };

  const handleEdit = (sala: Sala) => openModal(sala);

  const handleDelete = (id: number) => {
    setIdParaExcluir(id);
    setShowConfirm(true);
  };

  const confirmarExclusao = () => {
    if (idParaExcluir != null) {
      const novaLista = salas.filter(s => s.id !== idParaExcluir);
      setSalas(novaLista);
      saveSalas(novaLista);
      setShowConfirm(false);
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
          {salas.map(s => (
            <div className="col" key={s.id}>
              <SalaCard sala={s} onEdit={handleEdit} onDelete={handleDelete} />
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
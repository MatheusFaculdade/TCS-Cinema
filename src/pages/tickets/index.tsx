import { useEffect, useState } from 'react'
import { Ingresso } from '../../models/Ingresso'
import { getAllIngressos, saveIngressos } from '../../services/ingressoService'
import { TicketCard } from '../../components/TicketCard'
import { TicketModal } from '../../components/TicketModal'
import { ConfirmationModal } from '../../components/ConfirmationModal'

export function Ingressos() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([])
  const [ingressoEdit, setIngressoEdit] = useState<Ingresso | null>(null)
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    setIngressos(getAllIngressos())
  }, [])

  const openModal = (ingresso?: Ingresso) => {
    setIngressoEdit(ingresso ?? null)
    setShowModal(true)
  }

  const handleSave = (ingresso: Ingresso) => {
    const novaLista = ingressoEdit
      ? ingressos.map(i => (i.id === ingresso.id ? i : i))
      : [...ingressos, { ...ingresso, id: ingressos.length > 0 ? Math.max(...ingressos.map(i => i.id)) + 1 : 1 }]

    setIngressos(novaLista)
    saveIngressos(novaLista)
    setShowModal(false)
  }

  const handleEdit = (ingresso: Ingresso) => openModal(ingresso)

  const handleDelete = (id: number) => {
    setIdParaExcluir(id)
    setShowConfirm(true)
  }

  const confirmarExclusao = () => {
    if (idParaExcluir != null) {
      const novaLista = ingressos.filter(i => i.id !== idParaExcluir)
      setIngressos(novaLista)
      saveIngressos(novaLista)
      setShowConfirm(false)
    }
  }

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
          {ingressos.map(i => (
            <div className="col" key={i.id}>
              <TicketCard ingresso={i} onEdit={handleEdit} onDelete={handleDelete} />
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
  )
}
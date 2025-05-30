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

  const handleSave = (ingresso: Ingresso) => {
    const novaLista = ingressoEdit
      ? ingressos.map(i => (i.id === ingresso.id ? ingresso : i))
      : [...ingressos, ingresso]

    setIngressos(novaLista)
    saveIngressos(novaLista)
  }

  const handleEdit = (ingresso: Ingresso) => {
    setIngressoEdit(ingresso)
    setShowModal(true)
  }

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
    <div className="container mt-4">
      <h3>Ingressos</h3>
      <div className="mb-3 text-end">
        <button className="btn btn-success" onClick={() => {
          setIngressoEdit(null)
          setShowModal(true)
        }}>
          Novo Ingresso
        </button>
      </div>

      <div className="row g-4">
        {ingressos.map(i => (
          <TicketCard key={i.id} ingresso={i} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <TicketModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} ingressoParaEditar={ingressoEdit} />
      <ConfirmationModal show={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmarExclusao} message="Deseja excluir este ingresso?" />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Sala } from '../../models/Sala'
import { getAllSalas, saveSalas } from '../../services/salaService'
import { SalaCard } from '../../components/SalaCard'
import { SalaModal } from '../../components/SalaModal'
import { ConfirmationModal } from '../../components/ConfirmationModal'

export function Salas() {
  const [salas, setSalas] = useState<Sala[]>([])
  const [salaEdit, setSalaEdit] = useState<Sala | null>(null)
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    setSalas(getAllSalas())
  }, [])

  const handleSave = (sala: Sala) => {
    const novaLista = salaEdit
      ? salas.map(s => (s.id === sala.id ? sala : s))
      : [...salas, sala]

    setSalas(novaLista)
    saveSalas(novaLista)
  }

  const handleEdit = (sala: Sala) => {
    setSalaEdit(sala)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    setIdParaExcluir(id)
    setShowConfirm(true)
  }

  const confirmarExclusao = () => {
    if (idParaExcluir != null) {
      const novaLista = salas.filter(s => s.id !== idParaExcluir)
      setSalas(novaLista)
      saveSalas(novaLista)
      setShowConfirm(false)
    }
  }

  return (
    <div className="container mt-4">
      <h3>Salas</h3>
      <div className="mb-3 text-end">
        <button className="btn btn-success" onClick={() => {
          setSalaEdit(null)
          setShowModal(true)
        }}>
          Nova Sala
        </button>
      </div>

      <div className="row g-4">
        {salas.map(s => (
          <SalaCard key={s.id} sala={s} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <SalaModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} salaParaEditar={salaEdit} />
      <ConfirmationModal show={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmarExclusao} message="Deseja excluir esta sala?" />
    </div>
  )
}

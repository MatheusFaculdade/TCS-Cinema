import { useEffect, useState } from 'react'
import { Sessao } from '../../models/Sessao'
import { getAllSessoes, saveSessoes } from '../../services/sessaoService'
import { SessaoCard } from '../../components/SessaoCard'
import { SessaoModal } from '../../components/SessaoModal'
import { ConfirmationModal } from '../../components/ConfirmationModal'

export function Sessoes() {
  const [sessoes, setSessoes] = useState<Sessao[]>([])
  const [sessaoEdit, setSessaoEdit] = useState<Sessao | null>(null)
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    setSessoes(getAllSessoes())
  }, [])

  const handleSave = (sessao: Sessao) => {
    const novaLista = sessaoEdit
      ? sessoes.map(s => (s.id === sessao.id ? sessao : s))
      : [...sessoes, sessao]

    setSessoes(novaLista)
    saveSessoes(novaLista)
  }

  const handleEdit = (sessao: Sessao) => {
    setSessaoEdit(sessao)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    setIdParaExcluir(id)
    setShowConfirm(true)
  }

  const confirmarExclusao = () => {
    if (idParaExcluir != null) {
      const novaLista = sessoes.filter(s => s.id !== idParaExcluir)
      setSessoes(novaLista)
      saveSessoes(novaLista)
      setShowConfirm(false)
    }
  }

  return (
    <div className="container mt-4">
      <h3>Sessões</h3>
      <div className="mb-3 text-end">
        <button className="btn btn-success" onClick={() => {
          setSessaoEdit(null)
          setShowModal(true)
        }}>
          Nova Sessão
        </button>
      </div>

      <div className="row g-4">
        {sessoes.map(s => (
          <SessaoCard key={s.id} sessao={s} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <SessaoModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} sessaoParaEditar={sessaoEdit} />
      <ConfirmationModal show={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmarExclusao} message="Deseja excluir esta sessão?" />
    </div>
  )
}

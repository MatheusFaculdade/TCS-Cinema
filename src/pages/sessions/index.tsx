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

  const openModal = (sessao?: Sessao) => {
    setSessaoEdit(sessao ?? null)
    setShowModal(true)
  }

  const handleSave = (sessao: Sessao) => {
    const novaLista = sessaoEdit
      ? sessoes.map(s => (s.id === sessao.id ? sessao : s))
      : [...sessoes, { ...sessao, id: sessoes.length > 0 ? Math.max(...sessoes.map(s => s.id)) + 1 : 1 }]

    setSessoes(novaLista)
    saveSessoes(novaLista)
    setShowModal(false)
  }

  const handleEdit = (sessao: Sessao) => openModal(sessao)

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
          {sessoes.map(s => (
            <div className="col" key={s.id}>
              <SessaoCard sessao={s} onEdit={handleEdit} onDelete={handleDelete} />
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
  )
}
import { Modal } from '../common/Modal'

interface Props {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  message?: string
}

export function ConfirmationModal({ show, onClose, onConfirm, message }: Props) {
  if (!show) return null

  return (
    <Modal
      id="modal-confirmacao"
      title="Confirmação"
      onClick={onConfirm}
      onClose={onClose}
      btnSalvar="Excluir"
      btnCancelar="Cancelar"
      body={
        <p>{message || 'Tem certeza que deseja continuar?'}</p>
      }
    />
  )
}

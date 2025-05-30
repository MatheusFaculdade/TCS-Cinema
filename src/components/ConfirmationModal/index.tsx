import { Modal, Button } from 'react-bootstrap'

interface Props {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  message?: string
}

export function ConfirmationModal({ show, onClose, onConfirm, message }: Props) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title>Confirmação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message || 'Tem certeza que deseja continuar?'}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

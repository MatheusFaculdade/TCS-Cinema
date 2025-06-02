import { ReactNode } from 'react'

interface ModalProps {
  id: string
  title: string
  body: ReactNode
  onClick: () => void
  onClose: () => void
  btnSalvar?: string
  btnCancelar?: string
}

export function Modal({
  id,
  title,
  body,
  onClick,
  onClose,
  btnSalvar = 'Salvar',
  btnCancelar = 'Cancelar'
}: ModalProps) {
  return (
    <div className="modal fade show d-block" id={id} tabIndex={-1} aria-labelledby={`${id}Label`} aria-modal="true" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Fechar"></button>
          </div>

          <div className="modal-body">{body}</div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {btnCancelar}
            </button>
            <button type="button" className="btn btn-primary" onClick={onClick}>
              {btnSalvar}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { MouseEventHandler } from 'react'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  variant?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  icone?: string
  isModal?: boolean
  dataBsTarget?: string
}

export function Button({
  text,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  icone,
  isModal = false,
  dataBsTarget = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} w-100`}
      disabled={disabled || loading}
      onClick={!isModal ? onClick : undefined}
      {...(isModal && {
        'data-bs-toggle': 'modal',
        'data-bs-target': `#${dataBsTarget}`
      })}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      ) : (
        icone && <i className={`bi bi-${icone} me-1`}></i>
      )}
      {text}
    </button>
  )
}

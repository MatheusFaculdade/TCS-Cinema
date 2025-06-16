import { ChangeEvent } from 'react'

interface InputProps {
  id: string
  type?: string
  label: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  variant?: 'form-floating' | undefined
}

export function Input({
  id,
  type = 'text',
  label,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  variant
}: InputProps) {
  const isFloating = variant === 'form-floating'

  return (
    <div className={isFloating ? 'form-floating mt-2' : 'mb-1'}>
      {!isFloating && label && (
        <label className="form-label mt-1" htmlFor={id}>{label}</label>
      )}
      <input
        id={id}
        type={type}
        className="form-control form-control-sm"
        placeholder={isFloating ? placeholder || label : placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {isFloating && <label htmlFor={id}>{label}</label>}
    </div>
  )
}

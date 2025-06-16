import { useEffect, useState } from 'react'
import { Sala } from '../../models/Sala'
import { Modal } from '../common/Modal'
import { Input } from '../common/Input'

interface Props {
  show: boolean
  onClose: () => void
  onSave: (sala: Sala) => void
  salaParaEditar?: Sala | null
}

export function SalaModal({ show, onClose, onSave, salaParaEditar }: Props) {
  const [nome, setNome] = useState('')
  const [capacidade, setCapacidade] = useState('')
  const [tipo, setTipo] = useState('')

  useEffect(() => {
    if (show) {
      if (salaParaEditar) {
        setNome(salaParaEditar.nome)
        setCapacidade(salaParaEditar.capacidade.toString())
        setTipo(salaParaEditar.tipo)
      } else {
        setNome('')
        setCapacidade('')
        setTipo('')
      }
    }
  }, [show, salaParaEditar])

  const handleSubmit = () => {
    if (!nome || !capacidade || !tipo) {
      alert('Preencha todos os campos.')
      return
    }

    const novaSala = new Sala(
      salaParaEditar?.id ?? Date.now().toString(),
      nome,
      parseInt(capacidade),
      tipo
    )

    onSave(novaSala)
    
    setNome('')
    setCapacidade('')
    setTipo('')
    
    onClose()
  }

  const handleClose = () => {
    setNome('')
    setCapacidade('')
    setTipo('')
    onClose()
  }

  if (!show) return null

  return (
    <Modal
      id="modal-sala"
      title={salaParaEditar ? 'Editar Sala' : 'Cadastrar Sala'}
      onClick={handleSubmit}
      onClose={handleClose}
      body={
        <>
          <Input
            id="nome"
            label="Nome da Sala"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <Input
            id="capacidade"
            type="number"
            label="Capacidade"
            value={capacidade}
            onChange={e => setCapacidade(e.target.value)}
            required
          />
          <div className="mb-2">
            <label htmlFor="tipo" className="form-label">Tipo</label>
            <select
              id="tipo"
              className="form-select form-select-sm"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
            >
              <option value="">Tipo</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
          </div>
        </>
      }
    />
  )
}
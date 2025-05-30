import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Sala } from '../../models/Sala'

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
    if (salaParaEditar) {
      setNome(salaParaEditar.nome)
      setCapacidade(salaParaEditar.capacidade.toString())
      setTipo(salaParaEditar.tipo)
    } else {
      setNome('')
      setCapacidade('')
      setTipo('')
    }
  }, [salaParaEditar])

  const handleSubmit = () => {
    if (!nome || !capacidade || !tipo) {
      alert('Preencha todos os campos.')
      return
    }

    const sala = new Sala(
      salaParaEditar?.id ?? Date.now(),
      nome,
      parseInt(capacidade),
      tipo
    )

    onSave(sala)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{salaParaEditar ? 'Editar' : 'Cadastrar'} Sala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control className="mb-2" placeholder="Nome da Sala" value={nome} onChange={e => setNome(e.target.value)} />
          <Form.Control className="mb-2" type="number" placeholder="Capacidade" value={capacidade} onChange={e => setCapacidade(e.target.value)} />
          <Form.Select className="mb-2" value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="">Tipo</option>
            <option value="1">2D</option>
            <option value="2">3D</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

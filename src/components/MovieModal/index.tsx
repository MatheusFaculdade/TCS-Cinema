import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Filme } from '../../models/Filme'

interface Props {
  show: boolean
  onClose: () => void
  onSave: (filme: Filme) => void
  filmeParaEditar?: Filme | null
}

export function MovieModal({ show, onClose, onSave, filmeParaEditar }: Props) {
  const [form, setForm] = useState<Omit<Filme, 'id'>>({
    title: '',
    description: '',
    gender: 0,
    classification: 0,
    duration: 0,
    releaseDate: '',
  })

  useEffect(() => {
    if (filmeParaEditar) {
      const { id, ...rest } = filmeParaEditar
      setForm(rest)
    } else {
      setForm({
        title: '',
        description: '',
        gender: 0,
        classification: 0,
        duration: 0,
        releaseDate: '',
      })
    }
  }, [filmeParaEditar])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm(prev => ({
      ...prev,
      [id]: id === 'duration' || id === 'gender' || id === 'classification' ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    const filme = new Filme(
      filmeParaEditar?.id ?? Date.now(),
      form.title,
      form.description,
      form.gender,
      form.classification,
      form.duration,
      form.releaseDate
    )
    onSave(filme)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>{filmeParaEditar ? 'Editar Filme' : 'Cadastrar Filme'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control className="mb-2" id="title" placeholder="Título" value={form.title} onChange={handleChange} required />
          <Form.Control as="textarea" className="mb-2" id="description" placeholder="Descrição" value={form.description} onChange={handleChange} required />
          <Form.Select className="mb-2" id="gender" value={form.gender} onChange={handleChange} required>
            <option value={0}>Selecione o Gênero</option>
            <option value={1}>Ação</option>
            <option value={2}>Comédia</option>
            <option value={3}>Drama</option>
            <option value={4}>Ficção Científica</option>
            <option value={5}>Terror</option>
          </Form.Select>
          <Form.Select className="mb-2" id="classification" value={form.classification} onChange={handleChange} required>
            <option value={0}>Classificação Indicativa</option>
            <option value={1}>Livre</option>
            <option value={2}>10 anos</option>
            <option value={3}>12 anos</option>
            <option value={4}>14 anos</option>
            <option value={5}>16 anos</option>
            <option value={6}>18 anos</option>
          </Form.Select>
          <Form.Control className="mb-2" id="duration" placeholder="Duração (minutos)" type="number" value={form.duration} onChange={handleChange} required />
          <Form.Control className="mb-2" id="releaseDate" type="date" value={form.releaseDate} onChange={handleChange} required />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

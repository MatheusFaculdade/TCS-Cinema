import { useEffect, useState } from 'react'
import { Filme } from '../../models/Filme'
import { Modal } from '../common/Modal'
import { Input } from '../common/Input'

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
    if (show) {
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
    }
  }, [show, filmeParaEditar]) 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setForm(prev => ({
      ...prev,
      [id]: ['duration', 'gender', 'classification'].includes(id) ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    const { title, description, gender, classification, duration, releaseDate } = form

    if (!title || !description || !gender || !classification || !duration || !releaseDate) {
      alert('Preencha todos os campos obrigatórios.')
      return
    }

    const novoFilme = new Filme(
      filmeParaEditar?.id ?? Date.now().toString(),
      title,
      description,
      gender,
      classification,
      duration,
      releaseDate
    )

    onSave(novoFilme)
    
    setForm({
      title: '',
      description: '',
      gender: 0,
      classification: 0,
      duration: 0,
      releaseDate: '',
    })
    
    onClose()
  }

  const handleClose = () => {
    setForm({
      title: '',
      description: '',
      gender: 0,
      classification: 0,
      duration: 0,
      releaseDate: '',
    })
    onClose()
  }

  if (!show) return null

  return (
    <Modal
      id="modal-filme"
      title={filmeParaEditar ? 'Editar Filme' : 'Cadastrar Filme'}
      onClick={handleSubmit}
      onClose={handleClose} 
      btnSalvar="Salvar"
      btnCancelar="Cancelar"
      body={
        <>
          <Input
            id="title"
            label="Título"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Input
            id="description"
            label="Descrição"
            value={form.description}
            onChange={handleChange}
            required
          />
          <div className="mb-2">
            <label htmlFor="gender" className="form-label">Gênero</label>
            <select
              id="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-select form-select-sm"
              required
            >
              <option value={0}>Selecione o Gênero</option>
              <option value={1}>Ação</option>
              <option value={2}>Comédia</option>
              <option value={3}>Drama</option>
              <option value={4}>Ficção Científica</option>
              <option value={5}>Terror</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="classification" className="form-label">Classificação</label>
            <select
              id="classification"
              value={form.classification}
              onChange={handleChange}
              className="form-select form-select-sm"
              required
            >
              <option value={0}>Classificação Indicativa</option>
              <option value={1}>Livre</option>
              <option value={2}>10 anos</option>
              <option value={3}>12 anos</option>
              <option value={4}>14 anos</option>
              <option value={5}>16 anos</option>
              <option value={6}>18 anos</option>
            </select>
          </div>
          <Input
            id="duration"
            label="Duração (minutos)"
            type="number"
            value={form.duration}
            onChange={handleChange}
            required
          />
          <Input
            id="releaseDate"
            label="Data de Lançamento"
            type="date"
            value={form.releaseDate}
            onChange={handleChange}
            required
          />
        </>
      }
    />
  )
}
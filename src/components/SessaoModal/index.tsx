import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Sessao } from '../../models/Sessao'

interface Props {
  show: boolean
  onClose: () => void
  onSave: (sessao: Sessao) => void
  sessaoParaEditar?: Sessao | null
}

export function SessaoModal({ show, onClose, onSave, sessaoParaEditar }: Props) {
  const [filmeId, setFilmeId] = useState('')
  const [salaId, setSalaId] = useState('')
  const [dataHora, setDataHora] = useState('')
  const [preco, setPreco] = useState('')
  const [idioma, setIdioma] = useState('')
  const [formato, setFormato] = useState('')
  const [filmes, setFilmes] = useState<any[]>([])
  const [salas, setSalas] = useState<any[]>([])

  useEffect(() => {
    const filmesLocal = JSON.parse(localStorage.getItem('filmes') || '[]')
    const salasLocal = JSON.parse(localStorage.getItem('salas') || '[]')
    setFilmes(filmesLocal)
    setSalas(salasLocal)
  }, [show])

  useEffect(() => {
    if (sessaoParaEditar) {
      setFilmeId(sessaoParaEditar.filmeId.toString())
      setSalaId(sessaoParaEditar.salaId.toString())
      setDataHora(sessaoParaEditar.dataHora)
      setPreco(sessaoParaEditar.preco.toString())
      setIdioma(sessaoParaEditar.idioma)
      setFormato(sessaoParaEditar.formato)
    } else {
      setFilmeId('')
      setSalaId('')
      setDataHora('')
      setPreco('')
      setIdioma('')
      setFormato('')
    }
  }, [sessaoParaEditar])

  const handleSubmit = () => {
    if (!filmeId || !salaId || !dataHora || !preco || !idioma || !formato) {
      alert('Preencha todos os campos.')
      return
    }

    const sessao = new Sessao(
      sessaoParaEditar?.id ?? Date.now(),
      parseInt(filmeId),
      parseInt(salaId),
      dataHora,
      parseFloat(preco),
      idioma,
      formato
    )

    onSave(sessao)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title>{sessaoParaEditar ? 'Editar' : 'Cadastrar'} Sessão</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select className="mb-2" value={filmeId} onChange={e => setFilmeId(e.target.value)} required>
            <option value="">Selecione o Filme</option>
            {filmes.map(f => (
              <option key={f.id} value={f.id}>{f.title}</option>
            ))}
          </Form.Select>
          <Form.Select className="mb-2" value={salaId} onChange={e => setSalaId(e.target.value)} required>
            <option value="">Selecione a Sala</option>
            {salas.map(s => (
              <option key={s.id} value={s.id}>{s.nome}</option>
            ))}
          </Form.Select>
          <Form.Control className="mb-2" type="datetime-local" value={dataHora} onChange={e => setDataHora(e.target.value)} required />
          <Form.Control className="mb-2" type="number" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} required />
          <Form.Select className="mb-2" value={idioma} onChange={e => setIdioma(e.target.value)} required>
            <option value="">Idioma</option>
            <option>Dublado</option>
            <option>Legendado</option>
          </Form.Select>
          <Form.Select className="mb-2" value={formato} onChange={e => setFormato(e.target.value)} required>
            <option value="">Formato</option>
            <option>2D</option>
            <option>3D</option>
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

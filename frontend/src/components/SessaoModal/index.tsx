import { useEffect, useState } from 'react'
import { Sessao } from '../../models/Sessao'
import { Modal } from '../common/Modal'
import { Input } from '../common/Input'
import { movieService } from '../../services/filmeService'
import { salaService } from '../../services/salaService'

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
    if (show) {
      movieService.getAll().then(setFilmes).catch(console.error)
      salaService.getAll().then(setSalas).catch(console.error)
    }
  }, [show])

  useEffect(() => {
    if (sessaoParaEditar) {
      setFilmeId(sessaoParaEditar.filmeId)
      setSalaId(sessaoParaEditar.salaId)
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
      sessaoParaEditar?.id ?? '', // string vazia para novo (será ignorado no back)
      filmeId,
      salaId,
      dataHora,
      parseFloat(preco),
      idioma,
      formato
    )

    onSave(sessao)
    onClose()
  }

  if (!show) return null

  return (
    <Modal
      id="modal-sessao"
      title={sessaoParaEditar ? 'Editar Sessão' : 'Cadastrar Sessão'}
      onClick={handleSubmit}
      onClose={onClose}
      body={
        <>
          <div className="mb-2">
            <label className="form-label">Filme</label>
            <select className="form-select form-select-sm" value={filmeId} onChange={e => setFilmeId(e.target.value)} required>
              <option value="">Selecione o Filme</option>
              {filmes.map(f => (
                <option key={f.id} value={f.id}>{f.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Sala</label>
            <select className="form-select form-select-sm" value={salaId} onChange={e => setSalaId(e.target.value)} required>
              <option value="">Selecione a Sala</option>
              {salas.map(s => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </select>
          </div>
          <Input type="datetime-local" id="dataHora" label="Data e Hora" value={dataHora} onChange={e => setDataHora(e.target.value)} required />
          <Input type="number" id="preco" label="Preço" value={preco} onChange={e => setPreco(e.target.value)} required />
          <div className="mb-2">
            <label className="form-label">Idioma</label>
            <select className="form-select form-select-sm" value={idioma} onChange={e => setIdioma(e.target.value)} required>
              <option value="">Idioma</option>
              <option>Dublado</option>
              <option>Legendado</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Formato</label>
            <select className="form-select form-select-sm" value={formato} onChange={e => setFormato(e.target.value)} required>
              <option value="">Formato</option>
              <option>2D</option>
              <option>3D</option>
            </select>
          </div>
        </>
      }
    />
  )
}

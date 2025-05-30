import { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Ingresso } from '../../models/Ingresso'
import { Sessao } from '../../models/Sessao'


interface Props {
  show: boolean
  onClose: () => void
  onSave: (ingresso: Ingresso) => void
  ingressoParaEditar?: Ingresso | null
}

type SessaoComLabel = Sessao & { label: string }

export function TicketModal({ show, onClose, onSave, ingressoParaEditar }: Props) {
  const [sessaoId, setSessaoId] = useState('')
  const [cliente, setCliente] = useState('')
  const [cpf, setCpf] = useState('')
  const [sessoes, setSessoes] = useState<SessaoComLabel[]>([])


  useEffect(() => {
    const sessoesLocal = JSON.parse(localStorage.getItem('sessoes') || '[]')
    const filmes = JSON.parse(localStorage.getItem('filmes') || '[]')

    const sessoesComFilme = sessoesLocal.map((sessao: Sessao) => {
      const filme = filmes.find((f: any) => f.id === sessao.filmeId)
      return {
        ...sessao,
        label: `${filme?.title || 'Filme'} - ${new Date(sessao.dataHora).toLocaleString('pt-BR')}`
      }
    })

    setSessoes(sessoesComFilme)
  }, [show])

  useEffect(() => {
    if (ingressoParaEditar) {
      setSessaoId(String(ingressoParaEditar.sessaoId))
      setCliente(ingressoParaEditar.cliente)
      setCpf(ingressoParaEditar.cpf)
    } else {
      setSessaoId('')
      setCliente('')
      setCpf('')
    }
  }, [ingressoParaEditar])

  const handleSubmit = () => {
    if (!sessaoId || !cliente || !cpf) {
      alert('Preencha todos os campos!')
      return
    }

    const ingresso = new Ingresso(
      ingressoParaEditar?.id ?? Date.now(),
      parseInt(sessaoId),
      cliente,
      cpf
    )

    onSave(ingresso)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header className="bg-dark text-white" closeButton>
        <Modal.Title>{ingressoParaEditar ? 'Editar' : 'Novo'} Ingresso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select className="mb-2" value={sessaoId} onChange={e => setSessaoId(e.target.value)} required>
            <option value="">Selecione a Sessão</option>
            {sessoes.map(sessao => (
              <option key={sessao.id} value={sessao.id}>{sessao.label}</option>
            ))}
          </Form.Select>
          <Form.Control className="mb-2" placeholder="Nome do Cliente" value={cliente} onChange={e => setCliente(e.target.value)} required />
          <Form.Control className="mb-2" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

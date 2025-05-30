interface Props {
  cliente: string
  cpf: string
  filme: string
  dataHora: string
}

export function IngressoCard({ cliente, cpf, filme, dataHora }: Props) {
  return (
    <div className="col-md-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">{cliente}</h5>
          <p className="card-text">CPF: {cpf}</p>
          <p className="card-text">Filme: {filme}</p>
          <p className="card-text">Data: {new Date(dataHora).toLocaleString('pt-BR')}</p>
        </div>
      </div>
    </div>
  )
}

export class Ingresso {
  constructor(
    public id: number,
    public sessaoId: number,
    public cliente: string,
    public cpf: string,
    public assento: string,
    public pagamento: number,
  ) {}
}

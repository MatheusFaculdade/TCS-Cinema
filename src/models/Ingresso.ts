export class Ingresso {
  constructor(
    public id: string,
    public sessaoId: string,
    public cliente: string,
    public cpf: string,
    public assento: string,
    public pagamento: number,
  ) {}
}

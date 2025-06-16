export class Sessao {
  constructor(
    public id: string,
    public filmeId: string,
    public salaId: string,
    public dataHora: string,
    public preco: number,
    public idioma: string,
    public formato: string
  ) {}
}

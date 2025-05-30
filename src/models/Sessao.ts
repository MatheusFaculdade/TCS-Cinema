export class Sessao {
  constructor(
    public id: number,
    public filmeId: number,
    public salaId: number,
    public dataHora: string,
    public preco: number,
    public idioma: string,
    public formato: string
  ) {}
}

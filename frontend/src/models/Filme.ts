export class Filme {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public gender: number,
    public classification: number,
    public duration: number,
    public releaseDate: string
  ) {}
}

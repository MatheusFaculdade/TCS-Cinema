import { Filme } from '../models/Filme';

const STORAGE_KEY = 'filmes';

export function getAllFilmes(): Filme[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function saveFilmes(filmes: Filme[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filmes));
}

export async function buscarImagem(titulo: string): Promise<string> {
  const apiKey = "a49b91a95c94ea944df85263d4e787e0";
  const baseUrl = "https://api.themoviedb.org/3";
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  try {
    const res = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(titulo)}`);
    const data = await res.json();
    const filme = data.results?.[0];
    return filme ? `${baseImageUrl}${filme.poster_path}` : "/notFound.png";
  } catch {
    return "/notFound.png";
  }
}

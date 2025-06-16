import { api } from './api';
import { Filme } from '../models/Filme';

export const movieService = {
  async getAll(): Promise<Filme[]> {
    const res = await api.get('/filmes');
    return res.data;
  },

  async create(filme: Filme): Promise<Filme> {
  const { id, ...filmeSemId } = filme; 
  const res = await api.post('/filmes', filmeSemId);
  return res.data;
  },

  async update(id: string, data: Partial<Filme>): Promise<Filme> {
    const res = await api.put(`/filmes/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/filmes/${id}`);
  },

  async buscarImagem(titulo: string): Promise<string> {
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
};

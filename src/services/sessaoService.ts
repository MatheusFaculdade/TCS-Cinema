import { api } from './api';
import { Sessao } from '../models/Sessao';

export const sessaoService = {
  async getAll(): Promise<Sessao[]> {
    const res = await api.get('/sessoes');
    return res.data;
  },

  async create(sessao: Sessao): Promise<Sessao> {
    const { id, ...sessaoSemId } = sessao; 
    const res = await api.post('/sessoes', sessaoSemId);
    return res.data;
  },

  async update(id: string, data: Partial<Sessao>): Promise<Sessao> {
    const res = await api.put(`/sessoes/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/sessoes/${id}`);
  }
};

import { api } from './api';
import { Ingresso } from '../models/Ingresso';

export const ingressoService = {
  async getAll(): Promise<Ingresso[]> {
    const res = await api.get('/ingressos');
    console.log('Ingressos recebidos:', res.data);
    return res.data;
  },

  async create(ingresso: Ingresso): Promise<Ingresso> {
    const { id, ...ticketSemId } = ingresso; 
    const res = await api.post('/ingressos', ticketSemId);
    return res.data;
  },

  async update(id: string, data: Partial<Ingresso>): Promise<Ingresso> {
    const res = await api.put(`/ingressos/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/ingressos/${id}`);
  }
};

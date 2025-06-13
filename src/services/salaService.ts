import { api } from './api';
import { Sala } from '../models/Sala';

export const salaService = {
  async getAll(): Promise<Sala[]> {
    const res = await api.get('/salas');
    return res.data;
  },

  async create(sala: Sala): Promise<Sala> {
    const { id, ...salaAux } = sala; 
    const res = await api.post('/salas', salaAux);
    return res.data;
  },

  async update(id: string, data: Partial<Sala>): Promise<Sala> {
    const res = await api.put(`/salas/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/salas/${id}`);
  }
};

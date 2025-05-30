import { Ingresso } from '../models/Ingresso'

const STORAGE_KEY = 'ingressos'

export function getAllIngressos(): Ingresso[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function saveIngressos(lista: Ingresso[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

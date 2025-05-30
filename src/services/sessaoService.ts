import { Sessao } from '../models/Sessao'

const STORAGE_KEY = 'sessoes'

export function getAllSessoes(): Sessao[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function saveSessoes(lista: Sessao[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
}

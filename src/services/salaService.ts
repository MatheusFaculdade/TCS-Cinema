import { Sala } from '../models/Sala'

const STORAGE_KEY = 'salas'

export function getAllSalas(): Sala[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function saveSalas(salas: Sala[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(salas))
}

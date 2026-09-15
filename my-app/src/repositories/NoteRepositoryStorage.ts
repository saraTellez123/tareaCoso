import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';
//STORAGE_KEY es el nombre fd ela fokin cajita donde vamos a gurdar todo lo de las notas jiji
const STORAGE_KEY = '@notes';

// Función interna para leer todas las notas guardadas, basicamente la podemos usar solo en el archivo
async function getStoredNotes(): Promise<Note[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY); //si papi dame todo gordis grrrr
  return json ? JSON.parse(json) : []; //lo vuelve un array otra vez
}

// CREATE
export async function createNote(title: string, content: string) {
  const notes = await getStoredNotes();
  const newNote: Note = { id: Date.now().toString(), title, content }; //crea la nueva nota 
  notes.push(newNote); //agrega la nota en el array q ya teniamos lel
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); //agarra convierte a strings grr y lo guarda
}
// READ (todas)
export async function getAllNotes(): Promise<Note[]> {
  return await getStoredNotes();
}

// UPDATE
export async function updateNote(id: string, title: string, content: string) {
  const notes = await getStoredNotes(); //trae todas las notas grr
  const updated = notes.map((n) => (n.id === id ? { ...n, title, content } : n)); //busca el id de la nota, cuando lo encuentra crea un objeto copiando todo lo q tenia n, pero cambiando los nuevos valores lel
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// DELETE
export async function deleteNote(id: string) {
  const notes = await getStoredNotes();
  const filtered = notes.filter((n) => n.id !== id); //quedate cpon las notas q no sean las del id 
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered)); 
}
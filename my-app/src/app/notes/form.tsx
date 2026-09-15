import { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createNote, updateNote, getAllNotes } from '../../../src/repositories/NoteRepositoryStorage';

export default function NoteFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(''); 

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
        // IIFE: función async que se declara y ejecuta al instante,
      // porque un useEffect no puede ser async directamenteq
      (async () => {
        const notes = await getAllNotes();
        const note = notes.find((n) => n.id === id);
        if (note) {
          setTitle(note.title);
          setContent(note.content);
        }
      })();
    }
  }, [id]);

  async function handleSave() {
    if (title.trim().length === 0) {
      setError('El título es obligatorio, no puede quedar vacío.');
      return;
    }
    setError('');

    if (isEditing) {
      await updateNote(id!, title.trim(), content.trim());
    } else {
      await createNote(title.trim(), content.trim());
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (error) setError('');
        }}
        placeholder="Ej: Idea para el proyecto"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Contenido</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Escribe algo..."
        multiline
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  inputError: { borderColor: '#dc2626' },
  errorText: { color: '#dc2626', marginTop: 4, fontSize: 13 },
  saveButton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, marginTop: 24 },
  saveButtonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
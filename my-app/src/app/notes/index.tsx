import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { deleteNote, getAllNotes } from '../../../src/repositories/NoteRepositoryStorage';
import { Note } from '../../../src/types';

export default function NoteListScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

    // getAllNotes() es asincrónico (a diferencia de getAllTasks), por eso
  // necesitamos una función async separada para poder usar await
  const loadNotes = useCallback(async () => {
    const data = await getAllNotes();
    setNotes(data);
  }, []);

  // Se recarga cada vez que volvés a esta pantalla
  useFocusEffect(
    useCallback(() => {
      loadNotes(); //se recarga cada vez q volves a la pantalla 
    }, [loadNotes])
  );

  async function handleDelete(id: string) {
    await deleteNote(id);
    loadNotes(); // refrescamos la lista
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={() => router.push('../notes/form')}>
        <Text style={styles.addButtonText}>+ Nueva Nota</Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.content}</Text>
            </View>
            <Pressable onPress={() => router.push(`../notes/form?id=${item.id}`)}>
              <Text style={styles.link}>Editar</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={[styles.link, { color: 'red' }]}>Borrar</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No hay notas todavía.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: { backgroundColor: '#16a34a', padding: 12, borderRadius: 8, marginBottom: 16 },
  addButtonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardDesc: { color: '#555' },
  link: { color: '#2563eb', fontWeight: '600' },
});
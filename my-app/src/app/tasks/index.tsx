import { useCallback, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { getAllTasks, deleteTask } from '../../../src/repositories/TaskRepositorySQLite';
import { Task } from '../../types';

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  // useFocusEffect (no useEffect normal): recarga la lista CADA VEZ que
  // volvés a esta pantalla, por ejemplo después de crear/editar una tarea
  useFocusEffect(
    useCallback(() => {
      setTasks(getAllTasks()); 
    }, [])
  );

  function handleDelete(id: number) {
    deleteTask(id);
    setTasks(getAllTasks()); // refrescamos la lista
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.addButton} onPress={() => router.push('/tasks/form')}>
        <Text style={styles.addButtonText}>+ Nueva Tarea</Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
              <Text>{item.done ? 'Hecha' : 'Pendiente'}</Text>
            </View>
                 {/* Navega al form pasando el id como parámetro -> activa el modo edición */}
            <Pressable onPress={() => router.push(`/tasks/form?id=${item.id}`)}>
              <Text style={styles.link}>Editar</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={[styles.link, { color: 'red' }]}>Borrar</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No hay tareas todavía.</Text>}
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
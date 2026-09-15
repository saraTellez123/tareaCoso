import { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createTask, updateTask, getAllTasks } from '../../../src/repositories/TaskRepositorySQLite';

export default function TaskFormScreen() {
  //si llega un "id" por la URL editando, si no creando
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');  //mensaje de validacion

  const isEditing = !!id;
  //si estamos editamdo, pasa aqui y precarga los datos de la tarea existente 
  useEffect(() => {
    if (isEditing) {
      const task = getAllTasks().find((t) => t.id.toString() === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDone(task.done);
      }
    }
  }, [id]);

  function handleSave() {
    // Validación: título no puede estar vacío ni ser solo espacios
    if (title.trim().length === 0) {
      setError('El título es obligatorio, no puede quedar vacío.');
      return;
    }
    setError('');

    if (isEditing) {
      updateTask(Number(id), title.trim(), description.trim(), done);
    } else {
      createTask(title.trim(), description.trim());
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
          if (error) setError(''); // limpia el error apenas corriga 
        }}
        placeholder="Ej: Comprar pan"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Detalles..." />

      {isEditing && (
        <View style={styles.switchRow}>
          <Text style={styles.label}>¿Hecha?</Text>
          <Switch value={done} onValueChange={setDone} />
        </View>
      )}

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
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  saveButton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, marginTop: 24 },
  saveButtonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
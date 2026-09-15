import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi app de tareas y notas</Text>

      <Link href="/tasks" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ver Tareas (SQLite)</Text>
        </Pressable>
      </Link>
      
      {/* asChild: el Link "presta" su navegación al Pressable, en vez de */}
      {/* dibujarse como un link de texto azul subrayado por defecto */}
     
      <Link href="/tasks" asChild></Link>
      <Link href="/notes" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ver Notas (AsyncStorage)</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, width: '100%' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
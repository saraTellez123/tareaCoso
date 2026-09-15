import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../database/sqlite';

export default function RootLayout() {
    // Se ejecuta UNA sola vez al abrir la app (el [] vacío = "sin dependencias")
  // Acá es el lugar correcto porque este layout envuelve TODA la app.
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    // <Stack> = navegación tipo "pila": cada pantalla se apila sobre la anterior
    <Stack>
        {/* "name" debe coincidir EXACTO con la ruta del archivo dentro de app/ */}
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="tasks/index" options={{ title: 'Tareas (SQLite)' }} />
      <Stack.Screen name="tasks/form" options={{ title: 'Nueva/Editar Tarea' }} />
      <Stack.Screen name="notes/index" options={{ title: 'Notas (AsyncStorage)' }} />
      <Stack.Screen name="notes/form" options={{ title: 'Nueva/Editar Nota' }} />
    </Stack>
  );
}
//Esto define la forma en la q viewne los datos, basicamente le dice al typescrpit 
// "hola tiene estos campos yipi", se hizo parte para no tener andar copia y pega lel

export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
}
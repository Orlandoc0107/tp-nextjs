'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

// Define un tipo para la estructura de tus tareas
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  creado: string;
  finalizado?: boolean;
}

// Indica el tipo de tarea como una propiedad
interface ContainerTareasProps {
  tarea: Tarea;
}

export default function ContainerTareas(props: ContainerTareasProps) {
  const { tarea } = props;
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push('/modificar/tarea/' + tarea.id)
      }}>
      <hr />
      <h2>ID: {tarea.id}</h2>
      <h2>{tarea.titulo}</h2>
      <p>{tarea.descripcion}</p>
      <p>Creado: {tarea.creado}</p>
      <p>Finalizado: {tarea.finalizado ? 'Sí' : 'No'}</p>
      <hr />
    </div>
  );
}


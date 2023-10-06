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
  const fechaCreacion = new Date(tarea.creado);
  //
  const dia = fechaCreacion.getDate();
  const mes = fechaCreacion.getMonth() + 1;
  const anio = fechaCreacion.getFullYear();
  const hora = fechaCreacion.getHours();
  const minutos = fechaCreacion.getMinutes();
  //
  const fechaHoraFormateada = `${dia}/${mes}/${anio} Hora: ${hora}:${minutos}`;  return (
    <div
      onClick={() => {
        router.push('/modificar/tarea/' + tarea.id)
      }}>
      <hr />
      <div>
      <h2>Titulo: {tarea.titulo}</h2>
      <p> Descripcion: {tarea.descripcion}</p>
      <p>Creado: {fechaHoraFormateada}</p>
      <p>Finalizado: {tarea.finalizado ? 'Sí' : 'No'}</p>
      <hr />
      </div>
    </div>
  );
}


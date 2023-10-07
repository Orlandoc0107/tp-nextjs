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

      <div className="hover:bg-sky-700">
        <div className='max-w-lg mx-auto p-8'>
        <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          <h2>Titulo: {tarea.titulo}</h2>
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <p>Descripcion: {tarea.descripcion}</p>
            <p>Creado: {tarea.creado}</p>
            <p>Finalizado: {tarea.finalizado}</p>
          </div>
          </details>
        </div>
      </div>
    </div>
  );
}

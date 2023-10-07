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

      <div className="group block max-w-xs mx-auto rounded-lg p-6 bg-black ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 cursor-pointer">
        <div className="flex items-center space-x-3">
          <h2 className="text-slate-900 group-hover:text-white text-sm font-semibold">Titulo: {tarea.titulo}</h2>
          <div>
            <p className="text-slate-500 group-hover:text-white text-sm">Descripcion: {tarea.descripcion}</p>
            <p className="text-slate-500 group-hover:text-white text-sm">Creado: {tarea.creado}</p>
            <p className="text-slate-500 group-hover:text-white text-sm">Finalizado: {tarea.finalizado}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

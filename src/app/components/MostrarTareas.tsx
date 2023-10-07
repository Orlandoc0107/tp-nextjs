'use client'

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  creado: string;
  finalizado: boolean;
}
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ContainerTareas from './ContainerTareas';


async function getData(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/vertodo/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function MostrarTareas() { 
  const { data: session } = useSession();
  const [filtro, setFiltro] = useState<string>('');
  const [tareasFiltradas, setTareasFiltradas] = useState<Tarea[]>([]); 
  const [tareas, setTareas] = useState<Tarea[]>([]); 
  const token = session?.user?.access_token;
  

  useEffect(() => {
    if (token) {
      getData(token)
        .then(data => {
          setTareas(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [token]);

    // Función para manejar el cambio en el término de búsqueda
  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };

  useEffect(() => {
    if (filtro.trim() === '') {
      // Si el filtro está vacío, mostrar todas las tareas
      setTareasFiltradas(tareas);
    } else {
      // Filtrar las tareas basadas en el término de búsqueda
      const tareasFiltradas = tareas.filter((tarea) =>
        tarea.descripcion.toLowerCase().includes(filtro.toLowerCase())
      );
      setTareasFiltradas(tareasFiltradas);
    }
  }, [filtro, tareas]);


  return (
    <main>
    <div>
      <input
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        type="text"
        placeholder="Buscar tarea..."
        value={filtro}
        onChange={handleFiltroChange}
      />
    </div>
    <div className="max-h-60 overflow-y-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-1 py-1 hover:bg-sky-900 active:bg-blue-600 ...">
      {tareasFiltradas.map((tarea: Tarea) => (
        <ContainerTareas tarea={tarea} key={tarea.id} />
      ))}
    </div>
  </main>
);
}
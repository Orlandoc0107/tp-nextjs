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

  return (
    <main>
      <div className="max-h-80 overflow-y-auto h-40 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg px-2 py-2">
        {tareas.map((tarea: Tarea) => ( // Donde Tarea es el tipo de tus tareas
          <ContainerTareas tarea={tarea} key={tarea.id} />
        ))}
      </div>
    </main>
  )
}
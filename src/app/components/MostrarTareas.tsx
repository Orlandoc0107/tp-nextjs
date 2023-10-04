'use client'

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  creado: string;
  fianlizado: string;
}
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // No necesitas importar signIn y signOut si no los usas
import { mostrarTareas } from "../api/tareas/api";

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

export default function MostrarTareas() { // Cambia el nombre de la función a una convención de React (con mayúscula)
  const { data: session } = useSession();
  const [tareas, setTareas] = useState<Tarea[]>([]); // Indica el tipo de tareas como un arreglo de Tarea
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
      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            <h2>ID: {tarea.id}</h2>
            <h2>{tarea.titulo}</h2>
            <p>{tarea.descripcion}</p>
            <p>Creado: {tarea.creado}</p>
            <p>Finalizado: {tarea.fianlizado ? 'Sí' : 'No'}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
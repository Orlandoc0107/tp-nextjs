'use client'

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  creado: string;
  fianlizado: string;
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
      <div>
        {tareas.map((tarea: Tarea) => ( // Donde Tarea es el tipo de tus tareas
          <ContainerTareas tarea={tarea} key={tarea.id} />
        ))}
      </div>
    </main>
  )
}
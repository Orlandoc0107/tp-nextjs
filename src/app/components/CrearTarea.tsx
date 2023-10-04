'use client'

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { crearTarea } from '../api/tareas/api';
import { signIn, signOut, useSession } from 'next-auth/react';

const CrearTarea = () => {
  const { data: session, status } = useSession();
  const [titulo, setTitulo] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [user, setUser] = useState<number>();
  const [tareaCreada, setTareaCreada] = useState(null); // Para almacenar la respuesta de la función
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState(''); // Para el mensaje de confirmación

  const token = session?.user?.access_token;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Llamado de la función
    const result = await crearTarea({
      titulo,
      descripcion,
      user,
      token,
    });
    if (result) {
      setTareaCreada(result.response); // Almacena la tarea creada
      setMensajeConfirmacion('Tarea creada con éxito'); // Establece un mensaje de confirmación
    }
  };

  return (
    <div>
      <h1>Crear Tarea</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>
            Titulo: <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </h2>
        </div>
        <div>
          <h2>
            Descripcion: <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </h2>
        </div>
        <div>
          <button type="submit">Enviar</button>
          {/* Agrega botones para eliminar y actualizar si es necesario */}
        </div>
      </form>
      {mensajeConfirmacion && <p>{mensajeConfirmacion}</p>}
    </div>
  );
};

export default CrearTarea;
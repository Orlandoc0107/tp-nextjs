'use client'

import { useEffect, useState } from 'react';
import { crearTarea } from '../api/tareas/api';
import { signIn, signOut, useSession } from 'next-auth/react';

function CrearTarea({ }) {

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
    <div className="bg-gray-300 w-screen h-screen flex justify-center items-center grid-rows-1">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-flow-row-dense col-span-2">
        <div>
          <h2>
            Titulo: <input
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </h2>
        </div>
        <div>
          <h2>
            Descripcion: <input
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                    invalid:border-pink-500 invalid:text-pink-600
                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </h2>
        </div>
        <div>
          <button type="submit"
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ..."
          >Crear</button>
          {mensajeConfirmacion && <p>{mensajeConfirmacion} </p>}
          </div>
      </form>
      <br/>
    </div>
  );
};

export default CrearTarea;
'use client'

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

async function editarTarea(token: string, tareaId: string, nuevaData: any) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/actualizar/${tareaId}/`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(nuevaData),
        }
    );

    const data = await res.json();
    console.log(data);
}

async function borrarTarea(token: string, tareaId: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/borrar/${tareaId}/`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}


async function verTarea(token: string, tareaId: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/ver/${tareaId}/`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json();
    console.log(data);
    return data;
}

export default function ModificarTareas({ params }: { params: any }) {
    const { data: session, status } = useSession();
    const token = (session?.user.access_token);
    const tareaId = params.id;
    const [tareaData, setTareaData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [formularioVisible, setFormularioVisible] = useState(false);

    const [nuevaData, setNuevaData] = useState({
        titulo: '',
        descripcion: '',
        finalizado: false,
        user: '',
    });

    const handleBorrarTarea = async () => {
        if (token && tareaId) {
            await borrarTarea(token, tareaId);
            router.push('/');
        }
    };

    useEffect(() => {
        if (token && tareaId) {
            verTarea(token, tareaId)
                .then(data => {
                    setTareaData(data);
                    setNuevaData(data);
                    setLoading(false);
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error al obtener los datos de la tarea:", error);
                    setLoading(false);
                });
        }
    }, [token, tareaId]);

    const handleMostrarFormulario = () => {
        setFormularioVisible(true);
    };


    const handleGuardar = async () => {
        // Actualizar la tarea con los datos de nuevaData
        if (token && tareaId) {
            await editarTarea(token, tareaId, nuevaData);
            // Redirigir después de guardar
            router.push('/');
        }
    };


    return (
        <div>
            <Header />
            {status === 'loading' ? (
                <p>Cargando...</p>
            ) : (
                <div className="bg-gray-600 w-screen h-screen flex justify-center items-center">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div>
                        <p>Titulo: {tareaData.titulo}</p>
                    </div>
                    <div>
                        <p>Descripcion: {tareaData.descripcion}</p>
                    </div>
                    <div>
                        <p>Creado: {tareaData.creado}</p>
                    </div>
                    <div>
                        <p>Finalizacion: {tareaData.finalizado ? "Finalizado" : "No Finalizado"}</p>
                    </div>
                    </div>
                    {formularioVisible && (
                        <div>

                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-5" onSubmit={(e) => {
                                e.preventDefault();
                                handleGuardar();
                            }}>
                                <label>
                                    Título:
                                    <input
                                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                        type="text"
                                        value={nuevaData.titulo}
                                        onChange={(e) => setNuevaData({ ...nuevaData, titulo: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Descripción:
                                    <input
                                                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                                            invalid:border-pink-500 invalid:text-pink-600
                                                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                        type="text"
                                        value={nuevaData.descripcion}
                                        onChange={(e) => setNuevaData({ ...nuevaData, descripcion: e.target.value })}
                                    />
                                </label>

                                <label>
                                    Finalizado  
                                    <input

                                        type="checkbox"
                                        checked={nuevaData.finalizado}
                                        onChange={(e) => setNuevaData({ ...nuevaData, finalizado: e.target.checked })}
                                    />
                                </label>

                                <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ...">Guardar</button>
                            </form>
                        </div>
                    )}
                    <button onClick={handleBorrarTarea} className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ...">Borrar</button>
                    <button onClick={handleMostrarFormulario} className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ...">Editar</button>
                </div>
            )}
            <Footer />
        </div>
    );
}
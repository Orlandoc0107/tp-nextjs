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

    const [nuevaData, setNuevaData] = useState({
        titulo: tareaData.titulo,
        descripcion: tareaData.descripcion,
        finalizado: tareaData.finalizado,
        user: tareaData.user, // Asegúrate de incluir el usuario si es necesario
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
                    setLoading(false);
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error al obtener los datos de la tarea:", error);
                    setLoading(false);
                });
        }
    }, [token, tareaId]);

    const handleGuardar = async () => {
        if (token && tareaId) {
            await editarTarea(token, tareaId, nuevaData);
            setTareaData(nuevaData);
        }
    };

    return (
        <div>
            <Header />
            <h1>Tarea</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
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
                    <div>
                        <h2>Editar Tarea</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleGuardar();
                        }}>
                            <label>
                                Título:
                                <input
                                    type="text"
                                    value={nuevaData.titulo}
                                    onChange={(e) => setNuevaData({ ...nuevaData, titulo: e.target.value })}
                                />
                            </label>
                            <label>
                                Descripción:
                                <input
                                    type="text"
                                    value={nuevaData.descripcion}
                                    onChange={(e) => setNuevaData({ ...nuevaData, descripcion: e.target.value })}
                                />
                            </label>
                            <label>
                                Finalizado:
                                <input
                                    type="checkbox"
                                    checked={nuevaData.finalizado}
                                    onChange={(e) => setNuevaData({ ...nuevaData, finalizado: e.target.checked })}
                                />
                            </label>
                            <button type="submit">Guardar</button>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
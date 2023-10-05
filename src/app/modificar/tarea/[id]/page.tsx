'use client'

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

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

    // Puedes manejar la respuesta aquí si es necesario
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
                    setLoading(false); // Marca la carga como completa
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error al obtener los datos de la tarea:", error);
                    setLoading(false); // Marca la carga como completa incluso en caso de error
                });
        }
    }, [token, tareaId]);

    return (
        <div>
            <Header />
            <h1>Tarea</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <div>
                        <p>Titulo: </p>{tareaData.titulo}
                    </div>
                    <div>
                        <p>Descripcion: </p>{tareaData.descripcion}
                    </div>
                    <div>
                        <p>Creado: </p>{tareaData.creado}
                    </div>
                    <div>
                        <p>Finalizacion: {tareaData.finalizado ? "Finalizado" : "No Finalizado"}</p>
                    </div>
                    
                </div>
            )}
            <button onClick={handleBorrarTarea}>Borrar</button>
            <Footer />
        </div>
    );
}

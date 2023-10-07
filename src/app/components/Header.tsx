'use client'
import ButtonAuth from "./ButtonAuth"
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";



export default function Header() {
  const { data: session, status } = useSession();
  //muestra el mensaje que esta cargando el Hearder
  if (status === "loading") {
    return <p>Cargando ...</p>;
  }
  // si el usuario tiene su session abierta return lo siguiente 
  if (session) {
    return (
      <>
        <div className="bg-cyan-600">
          <div>
                <ButtonAuth />
                <Link href="/perfil">
                  <button 
                  className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ..." 
                  >Mi Perfil</button>
                </Link>
                <Link href="/tareas">
                  <button 
                  className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ..." 
                  >Mis Tareas</button>
                </Link>
          </div>
        </div>
      </>
    )
  }
  // Si el nohay usuario return entonces regresa esto otro.
  return (
      <>
        <div className=" bg-cyan-950 flex justify-center ...">
          <div>
                <ButtonAuth />
                <Link href="/register">
                  <button
                  className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ..." 
                  >Registrar</button>
                </Link>
          </div>
        </div>
      </>
    );
}
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
        <div>
          <div>
            <ul>
              <li>
                <ButtonAuth />
              </li>
              <li>
                <Link href="/perfil">
                  <button>Mi Perfil</button>
                </Link>
              </li>
              <li>
                <Link href="/tareas">
                  <button>Mi Tareas</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }
  // Si el nohay usuario return entonces regresa esto otro.
  return (
      <>
        <div>
          <div>
            <ul>
              <li>
                <ButtonAuth />
              </li>
              <li>
                <Link href="/register">
                  <button>Registrar</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
}
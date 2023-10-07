'use client'
import { signIn, signOut, useSession } from "next-auth/react";


export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando ...</p>;
  }

  if (session) {

    return (
      <>
        <button 
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ..." 
        onClick={() => signOut()}>Desconectar</button>
      </>
    );
  }

  return (
    <>
      <button
      className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ..." 
      onClick={() => signIn()}>Ingresar</button>
    </>
  );
}

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
        
        <button onClick={() => signOut()}>Desconectar</button>
      </>
    );
  }

  return (
    <>
      Desconectar<br />
      <button onClick={() => signIn()}>Ingresar</button>
    </>
  );
}

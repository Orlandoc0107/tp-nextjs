"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { getUserData } from "../api/user/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserData {
  usuario: string;
  nombre: string;
  apellido: string;
  email: string;
}

const Perfil = () => {
  const { data: session, status } = useSession();
  const [fetchedData, setFetchedData] = useState<UserData | null>(null);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  console.log(session?.user?.access_token);

  const getCats = async () => {
    try {
      const data = await getUserData(session?.user?.access_token);
  
      // Datos obtenidos
      setFetchedData(data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  return (
    <div>
      <Header/>
      <h1>Mi Perfil</h1>
      <button onClick={getCats}>Mostrar Datos</button>

      {/* Mostrar los datos individualmente */}
      {fetchedData && (
        <div>
          <h3>Nombre de Usuario : {fetchedData.usuario}</h3>
          <p>Nombre: {fetchedData.nombre}</p>
          <p>Apellido: {fetchedData.apellido}</p>
          <p>Email: {fetchedData.email}</p>
        </div>
      )}
      <Footer/>
    </div>
  );
};
export default Perfil;

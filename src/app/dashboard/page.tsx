"use client";
import { useState } from "react"; // Importa useState
import { useSession } from "next-auth/react";
import { getUserData } from "../api/user/api";

// Define un tipo para los datos que esperas obtener
interface UserData {
  id: number;
  usuario: string;
  nombre: string;
  apellido: string;
  email: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [fetchedData, setFetchedData] = useState<UserData | null>(null);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  console.log(session?.user?.access_token);

  const getCats = async () => {
    try {
      const data = await getUserData(session?.user?.access_token);
      console.log(data);
  
      // Datos obtenidos
      setFetchedData(data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={getCats}>Mostrar Datos</button>

      {/* Mostrar los datos individualmente */}
      {fetchedData && (
        <div>
          <h2>ID: {fetchedData.id}</h2>
          <h3>Usuario: {fetchedData.usuario}</h3>
          <p>Nombre: {fetchedData.nombre}</p>
          <p>Apellido: {fetchedData.apellido}</p>
          <p>Email: {fetchedData.email}</p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;

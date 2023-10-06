"use client";

import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserData } from "../api/user/api"
import { useState, useEffect } from "react";
// Dashboard.tsx


const Perfil = () => {
  const { data: session } = useSession();
  const token = session?.user?.access_token;
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    email: "",
  }); // Inicializa el estado con un objeto vacío

  useEffect(() => {
    if (token) {
      // Llama a la función asincrónica y actualiza el estado con los datos del usuario
      getUserData(token)
        .then((data) => {
          setUserData(data);
          console.log(data)
        })
    }
  }, [token]);

  return (
    <div>
      <Header />
      <div className="bg-gray-300 w-screen h-screen flex justify-center">
        {userData && (
          <>
          <div className="bg-gray-600 w-screen h-screen flex justify-center items-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">Datos:
              <div>
                Nombre: {userData.nombre}
              </div>
              <div>
                Apellido: {userData.apellido}
              </div>
              <div>
                Email: {userData.email}
              </div>
            </div>
          </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
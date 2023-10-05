"use client";

import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Dashboard.tsx


const Perfil= () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <Header/>
      <h1>Perfil</h1>
      <Footer/>
    </div>
  );
};

export default Perfil;

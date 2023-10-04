"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserData } from "../api/user/api";
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

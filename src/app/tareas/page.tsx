'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import CrearTarea from '../components/CrearTarea';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ComponenteMostrarTareas from '../components/MostrarTareas';

const App = () => {
  const [creartareas, setCreartareas] = useState(false);
  const [mostrarTareas, setMostrarTareas] = useState(false);

  const toggleCrearTareas = () => {
    setCreartareas(!creartareas);
    // Asegurarse de que mostrarTareas se establece en false cuando se muestra CrearTarea
    if (mostrarTareas) {
      setMostrarTareas(false);
    }
  };

  const toggleMostrarTareas = () => {
    setMostrarTareas(!mostrarTareas);
    // Asegurarse de que creartareas se establece en false cuando se muestra ComponenteMostrarTareas
    if (creartareas) {
      setCreartareas(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-400 w-screen h-screen flex justify-center items-center">
        <button onClick={toggleCrearTareas}         
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ..." 
        >Crear</button>
        <button onClick={toggleMostrarTareas}
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ..." 
        >Mostrar Tareas</button>
        {creartareas && <CrearTarea />}
        {mostrarTareas && <ComponenteMostrarTareas />}
      </div>
      <Footer />
    </div>
  );
};

export default App;

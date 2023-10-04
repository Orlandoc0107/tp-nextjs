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
      <Header/>
      <h1>Tareas</h1>
      <button onClick={toggleCrearTareas}>Crear</button>
      <button onClick={toggleMostrarTareas}>Mostrar Tareas</button>
      {creartareas && <CrearTarea/>}
      {mostrarTareas && <ComponenteMostrarTareas/>}
      <Footer/>
    </div>
  );
};

export default App;

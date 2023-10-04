'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import CrearTarea from '../components/CrearTarea'
import Footer from '../components/Footer';
import Header from '../components/Header';
import ComponenteMostrarTareas from '../components/MostrarTareas';

const App = () => {
  const [creartareas, setCreartareas] = useState(false);
  const [mostrarTareas, setMostrarTareas] = useState(false);
  const toggleCrearTareas = () => {
    setCreartareas(!creartareas);
  };
  const toggleMostrarTareas = () => {
    setMostrarTareas(!mostrarTareas);
  };

  return (
    <div>
      <Header/>
      <h1>Tareas</h1>
      <button onClick={toggleCrearTareas}>Crear</button>
      {creartareas && <CrearTarea/>}
      <button onClick={toggleMostrarTareas}>Mostrar Tareas</button>
      {mostrarTareas&& <ComponenteMostrarTareas/>}
      <Footer/>
    </div>
  );
};

export default App;

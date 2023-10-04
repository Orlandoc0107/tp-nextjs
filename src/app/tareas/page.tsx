'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import CrearTarea from '../components/CrearTarea'
import Footer from '../components/Footer';
import Header from '../components/Header';

const App = () => {
  const [creartareas, setCreartareas] = useState(false);
  const [actualizartareas, setActualizartareas] = useState(false)
  const toggleFormulario = () => {
    setCreartareas(!creartareas);
  };

  return (
    <div>
      <Header/>
      <h1>Tareas</h1>
      <button onClick={toggleFormulario}>Crear</button>
      {creartareas && <CrearTarea/>}
      <Footer/>
    </div>
  );
};

export default App;

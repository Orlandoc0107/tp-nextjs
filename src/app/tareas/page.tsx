'use client'

import Header from '../components/Header';
import Footer from '../components/Footer';

const Tareas = () => {

  return (
    <div>
      <Header/>
      <h1>Pagina de Tareas</h1>
      <div>
        <div>
          <h2>Titulo: <input/></h2>

        </div>
        <div>
          <h2>Descripcion: <input/></h2>
        </div>
        <div>
          <h2>
            Creado :<div></div>
          </h2>
        </div>
        <div>
          <h2>Finalizado</h2>
          <input/>
        </div>
        <div>
          <button>Crear</button>
          <button>Eliminar</button>
          <button>Actualizar</button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default Tareas;
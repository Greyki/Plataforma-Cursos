import React, { Fragment, useState, useEffect } from "react";
import { cargarCursosDesdeStorage, guardarCursosEnStorage } from "./services/storage";
import CursoList from "./components/CursoList";
import CursoForm from "./components/CursoForm";
import "./App.css";

function App() {
  const [cursos, setCursos] = useState(() => cargarCursosDesdeStorage());
  const [cursoEditar, setCursoEditar] = useState(null);

  useEffect(() => {
    guardarCursosEnStorage(cursos);
  }, [cursos]);

  const guardarCurso = (curso) => {
    setCursos((prev) => {
      const existe = prev.some((c) => c.id === curso.id);
      if (existe) {
        return prev.map((c) => (c.id === curso.id ? curso : c));
      }
      return [...prev, curso];
    });
    setCursoEditar(null);
  };

  const eliminarCurso = (id) => {
    if (window.confirm("¿Eliminar este curso?")) {
      setCursos((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <Fragment>
      <div className="App" data-bs-theme="dark">
        <nav className="navbar navbar-dark bg-dark mb-4">
          <div className="container">
            <span className="navbar-brand mb-0 h1">Plataforma de Cursos Online</span>
          </div>
        </nav>

      <div className="container">
        <CursoForm cursoEditar={cursoEditar} onGuardar={guardarCurso} onCancelar={() => setCursoEditar(null)}/>
        <CursoList cursos={cursos} onEditar={setCursoEditar} onEliminar={eliminarCurso}/>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
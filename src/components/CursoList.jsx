import React from "react";
import CursoCard from "./CursoCard";

function CursoList({ cursos, onEditar, onEliminar }) {
  if (cursos.length === 0) {
    return <p className="text-center text-muted">No hay cursos registrados.</p>;
  }

  return (
    <div className="row">
      {cursos.map((curso) => (<CursoCard key={curso.id} curso={curso} onEditar={onEditar} onEliminar={onEliminar}/>))}
    </div>
  );
}

export default CursoList;
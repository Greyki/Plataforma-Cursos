import React, { useEffect, useState } from "react";
import { obtenerTasaCambio} from "../services/api";

function CursoCard({ curso, onEditar, onEliminar }) {
  const [precioUSD, setPrecioUSD] = useState(null);

  useEffect(() => {
    const cargarTasa = async () => {
      const tasa = await obtenerTasaCambio();
      if (tasa) {
        setPrecioUSD((curso.precio * tasa).toFixed(2));
      }
    };
    cargarTasa();
  }, [curso.precio]);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm curso-card">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{curso.nombre}</h5>
            <span  className={`badge ${curso.disponible ? "bg-success" : "bg-secondary"}`}>
              {curso.disponible ? "Disponible" : "Cerrado"}
            </span>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">{curso.codigo}</h6>
          <p className="card-text mb-1">
            <strong>Categoría:</strong> {curso.categoria}
          </p>
          <p className="card-text mb-1">
            <strong>Horas:</strong> {curso.horas} hrs
          </p>
          <p className="card-text mb-1">
            <strong>Precio:</strong> ${curso.precio.toLocaleString("es-CL")}{" "}{precioUSD && (<span className="text-muted">(~USD {precioUSD})</span>)}
          </p>

          <p className="card-text mb-1">
            <strong>Módulos:</strong>
          </p>
          <div className="mb-2">
            {curso.modulos.map((m, i) => (<span key={i} className="badge bg-light text-dark border me-1 mb-1">{m}</span>))}
          </div>

          <p className="card-text small text-muted mb-3">
            Instructor: {curso.instructor.nombre} — {curso.instructor.correo}
          </p>

          <div className="mt-auto d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={() => onEditar(curso)}>Editar</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(curso.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CursoCard;
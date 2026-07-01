import React, { useState, useEffect } from "react";

const cursoVacio = {
  id: null,
  codigo: "",
  nombre: "",
  categoria: "",
  horas: "",
  precio: "",
  disponible: true,
  modulos: "",
  instructor: {
    nombre: "",
    correo: ""
  }
};

function CursoForm({ cursoEditar, onGuardar, onCancelar }) {
  const [curso, setCurso] = useState(cursoVacio);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (cursoEditar) {
      setCurso({
        ...cursoEditar,
        modulos: cursoEditar.modulos.join(", ")
      });
    } else {
      setCurso(cursoVacio);
    }
  }, [cursoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "instructorNombre" || name === "instructorCorreo") {
      setCurso((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [name === "instructorNombre" ? "nombre" : "correo"]: value
        }
      }));
      return;
    }

    setCurso((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!curso.codigo.trim()) {
      nuevosErrores.codigo = "El código es obligatorio.";
    } else if (!/^[A-Z]{2,4}-\d{3}$/.test(curso.codigo.trim())) {
      nuevosErrores.codigo = "Formato esperado: AB-123 (ej: PY-301).";
    }

    if (!curso.nombre.trim() || curso.nombre.trim().length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!curso.categoria.trim()) {
      nuevosErrores.categoria = "La categoría es obligatoria.";
    }

    if (!curso.horas || curso.horas <= 0 || curso.horas > 500) {
      nuevosErrores.horas = "Las horas deben ser un número entre 1 y 500.";
    }

    if (!curso.precio || curso.precio <= 0) {
      nuevosErrores.precio = "El precio debe ser un número positivo.";
    }

    if (!curso.modulos.trim()) {
      nuevosErrores.modulos = "Debe ingresar al menos un módulo.";
    }

    // Validación de datos personales/sensibles del instructor
    if (!curso.instructor.nombre.trim()) {
      nuevosErrores.instructorNombre = "El nombre del instructor es obligatorio.";
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(curso.instructor.correo.trim())) {
      nuevosErrores.instructorCorreo = "Ingrese un correo válido (ej: nombre@dominio.cl).";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const cursoFinal = {
      ...curso,
      id: curso.id || Date.now(),
      horas: Number(curso.horas),
      precio: Number(curso.precio),
      modulos: curso.modulos.split(",").map((m) => m.trim()).filter(Boolean)
    };

    onGuardar(cursoFinal);
    setCurso(cursoVacio);
    setErrores({});
  };

  return (
    <form className="card p-4 shadow-sm mb-4" onSubmit={handleSubmit} noValidate>
      <h5 className="mb-3">{cursoEditar ? "Editar curso" : "Nuevo curso"}</h5>

      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Código</label>
          <input
            type="text"
            name="codigo"
            className={`form-control ${errores.codigo ? "is-invalid" : ""}`}
            value={curso.codigo}
            onChange={handleChange}
            placeholder="PY-301"
          />
          {errores.codigo && <div className="invalid-feedback">{errores.codigo}</div>}
        </div>

        <div className="col-md-8">
          <label className="form-label">Nombre del curso</label>
          <input
            type="text"
            name="nombre"
            className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
            value={curso.nombre}
            onChange={handleChange}
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">Categoría</label>
          <input
            type="text"
            name="categoria"
            className={`form-control ${errores.categoria ? "is-invalid" : ""}`}
            value={curso.categoria}
            onChange={handleChange}
          />
          {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">Horas</label>
          <input
            type="number"
            name="horas"
            className={`form-control ${errores.horas ? "is-invalid" : ""}`}
            value={curso.horas}
            onChange={handleChange}
          />
          {errores.horas && <div className="invalid-feedback">{errores.horas}</div>}
        </div>

        <div className="col-md-4">
          <label className="form-label">Precio (CLP)</label>
          <input
            type="number"
            name="precio"
            className={`form-control ${errores.precio ? "is-invalid" : ""}`}
            value={curso.precio}
            onChange={handleChange}
          />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>

        <div className="col-12">
          <label className="form-label">Módulos (separados por coma)</label>
          <input
            type="text"
            name="modulos"
            className={`form-control ${errores.modulos ? "is-invalid" : ""}`}
            value={curso.modulos}
            onChange={handleChange}
            placeholder="Variables, Funciones, Listas"
          />
          {errores.modulos && <div className="invalid-feedback">{errores.modulos}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre del instructor</label>
          <input
            type="text"
            name="instructorNombre"
            className={`form-control ${errores.instructorNombre ? "is-invalid" : ""}`}
            value={curso.instructor.nombre}
            onChange={handleChange}
          />
          {errores.instructorNombre && (
            <div className="invalid-feedback">{errores.instructorNombre}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Correo del instructor</label>
          <input
            type="email"
            name="instructorCorreo"
            className={`form-control ${errores.instructorCorreo ? "is-invalid" : ""}`}
            value={curso.instructor.correo}
            onChange={handleChange}
          />
          {errores.instructorCorreo && (
            <div className="invalid-feedback">{errores.instructorCorreo}</div>
          )}
        </div>

        <div className="col-12 form-check mt-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="disponibleCheck"
            name="disponible"
            checked={curso.disponible}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="disponibleCheck">
            Curso disponible
          </label>
        </div>
      </div>

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary">{cursoEditar ? "Guardar cambios" : "Agregar curso"}</button>
        {cursoEditar && (<button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>)}
      </div>
    </form>
  );
}

export default CursoForm;
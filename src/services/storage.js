const KEY = "cursos";

export const cargarCursosDesdeStorage = () => {
  try {
    const datos = localStorage.getItem(KEY);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    console.error("Error al leer cursos de localStorage:", error);
    return [];
  }
};

export const guardarCursosEnStorage = (cursos) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(cursos));
  } catch (error) {
    console.error("Error al guardar cursos en localStorage:", error);
  }
};
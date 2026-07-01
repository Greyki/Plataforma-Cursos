import axios from "axios";

export const obtenerTasaCambio = async () => {
  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/CLP");
    return response.data.rates.USD;
  } catch (error) {
    console.error("Error al obtener tasa de cambio:", error);
    return null;
  }
};
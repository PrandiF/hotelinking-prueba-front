import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_DEV}`;

export const getOffers = async () => {
  try {
    const { data } = await axios.get(`${USER_URL}/offers`, {
      withCredentials: true,
    });
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error al obtener las ofertas:", error);
    throw error;
  }
};

export const updateOfferStatus = async (id: number, newStatus: boolean) => {
  try {
    const res = await axios.put(
      `${USER_URL}/offers/${id}/status`,
      {
        status: newStatus,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error al actualizar el estado de la oferta:", error);
    throw error;
  }
};

import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_DEV}/promo-codes`;

type PromoCodeProps = {
  code: string;
  offer_id: number;
  is_redeemed: boolean;
};

export const getPromoCodes = async () => {
  try {
    const res = await axios.get(`${USER_URL}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error al obtener los códigos promocionales:", error);
    throw error;
  }
};

export const createPromoCode = async (promoCodeData: PromoCodeProps) => {
  try {
    const res = await axios.post(`${USER_URL}`, promoCodeData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear el código promocional:", error);
    throw error;
  }
};

export const redeemPromoCode = async (promoCodeId: number, code: string) => {
  console.log("Redeeming promo code ID:", promoCodeId); 
  try {
    const res = await axios.put(
      `${USER_URL}/${promoCodeId}/redeem`,
      { code },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error al canjear el código promocional:", error);
    throw error;
  }
};


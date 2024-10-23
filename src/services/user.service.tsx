import axios from "axios";

const USER_URL = `${import.meta.env.VITE_API_URL_DEV}`;

type UserProps = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  // confirm_password: string;
};

export const register = async (userData: UserProps) => {
  console.log(userData);
  try {
    const res = await axios.post(
      `${USER_URL}/register`,
      { ...userData },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${USER_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    console.log(res);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return "invalid password";
    } else {
      throw new Error("Error en la solicitud de login");
    }
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(
      `${USER_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

import { useNavigate } from "react-router-dom";
import InputText from "../../commons/InputText";
import InputPsw from "../../commons/InputPsw";
import Button1 from "../../commons/Button1";
import { useState } from "react";
import { login } from "../../services/user.service";
import { Report } from "notiflix/build/notiflix-report-aio";
import { useUserStoreLocalStorage } from "../../store/userStore";

type FormProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

function LoginForm({ onClick }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { loginState } = useUserStoreLocalStorage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const res = await login(userData.email, userData.password);
      if (res == "invalid password") {
        setIsLoading(false);
        Report.failure(
          "Error al iniciar sesión",
          "Contraseña incorrecta",
          "Ok",
          () => {
            setUserData({ email: "", password: "" });
          }
        );
      } else if (res.message == "User logged in successfully.") {
        setIsLoading(false);
        loginState();
        navigate("/inicio");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 mb-4 grid h-24 place-items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#304c5e] via-[#08293e] to-[#304c5e] bg-clip-border text-white shadow-lg shadow-[#304c5e]/40">
        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
          Iniciar Sesión
        </h3>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <InputText
          width="full"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <InputPsw name="password" onChange={handleChange} />
      </div>
      <div className="p-6 pt-0 xl:w-[50%] flex flex-col mx-auto">
        <Button1 text="Iniciar Sesión" onClick={HandleSubmit} />
        <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
          No tienes cuenta?
          <a
            className="ml-1 block font-sans text-sm font-bold leading-normal text-[#304c5e] antialiased cursor-pointer"
            onClick={onClick}
          >
            Registrarse
          </a>
        </p>
        {isLoading && (
          <div className="w-full flex justify-center items-center mt-2">
            <div className="text-center w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;

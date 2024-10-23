import InputText from "../../commons/InputText";
import InputPsw from "../../commons/InputPsw";
import Button1 from "../../commons/Button1";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/user.service";
import { Report } from "notiflix/build/notiflix-report-aio";

type FormProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

function RegisterForm({ onClick }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

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
      const res = await register(userData);
      if (userData.password != userData.confirm_password) {
        setIsLoading(false);
        Report.failure(
          "Error al crear la cuenta",
          "Las contraseñas no coinciden",
          "Ok",
          () => {}
        );
      }
      if (res == "The email has already been taken.") {
        setIsLoading(false);
        Report.failure(
          "Error al crear la cuenta",
          "El mail ya ha sido utilizado.",
          "Ok",
          () => {
            setUserData({
              email: "",
              password: "",
              name: "",
              lastname: "",
              confirm_password: "",
            });
          }
        );
      }
      if (!res) {
        setIsLoading(false);
        Report.failure(
          "Error al crear la cuenta",
          "Lo siento, no se ha podido crear la cuenta",
          "Ok",
          () => {
            setUserData({
              name: "",
              lastname: "",
              email: "",
              password: "",
              confirm_password: "",
            });
          }
        );
      }
      if (res) {
        setIsLoading(false);
        Report.success(
          "Cuenta creada correctamente",
          "Felicitaciones, tu cuenta se ha creado con exito",
          "Iniciar Sesión",
          () => {
            navigate("/");
          }
        );
      }
    } catch (error) {
      if (
        !userData.name ||
        !userData.lastname ||
        !userData.email ||
        !userData.password
      ) {
        Report.failure(
          "Error al crear la cuenta",
          "Debe completar todos los campos",
          "Ok"
        );
      }
      setIsLoading(false);
      console.error(error);
      throw error;
    }
  };
  return (
    <div className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-2">
      <div className="relative mx-4 -mt-6 mb-4 grid h-24 place-items-center overflow-hidden rounded-xl bg-gradient-to-r from-[#304c5e] via-[#08293e] to-[#304c5e] bg-clip-border text-white shadow-lg shadow-[#304c5e]/40">
        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
          Registrarse
        </h3>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <InputText
          width="full"
          placeholder="Nombre"
          onChange={handleChange}
          name="name"
        />
        <InputText
          width="full"
          placeholder="Apellido"
          onChange={handleChange}
          name="lastname"
        />
        <InputText
          width="full"
          placeholder="Email"
          onChange={handleChange}
          name="email"
        />
        <InputPsw name="password" onChange={handleChange} />
        <InputPsw name="confirm_password" onChange={handleChange} />
      </div>
      <div className="p-6 pt-0 xl:w-[50%] flex flex-col mx-auto">
        <Button1 text="Registrarse" onClick={HandleSubmit} />
        <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
          Ya tienes cuenta?
          <a
            className="ml-1 block font-sans text-sm font-bold leading-normal text-[#304c5e] antialiased cursor-pointer"
            onClick={onClick}
          >
            Iniciar Sesión
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

export default RegisterForm;

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import HeaderLogin from "../../commons/HeaderLogin";

function Authentication() {
  const [register, setRegister] = useState(false);

  const handleCangeForm = async () => {
    try {
      setRegister((prev) => !prev);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="absolute flex flex-col gap-2 w-full">
      <HeaderLogin />
      <div className="xl:mt-[8%] md:mt-[15%] mt-[35%] xl:w-[40%] w-[90%] flex mx-auto relative">
        <div
          className={`transition-all duration-500 transform ${
            register
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          } absolute w-full`}
        >
          <LoginForm onClick={handleCangeForm} />
        </div>
        <div
          className={`transition-all duration-500 transform ${
            register
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          } absolute w-full`}
        >
          <RegisterForm onClick={handleCangeForm} />
        </div>
      </div>
    </div>
  );
}

export default Authentication;

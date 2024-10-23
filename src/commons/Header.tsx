import LogoutButton from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

function Header() {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 absolute">
      <div><img src={logo} className="w-[80px]" /></div>
      <div className="flex gap-5 text-xl">
        <p className="hover:underline cursor-pointer" onClick={() => navigate("/inicio")}>Inicio</p>
        <p className="hover:underline cursor-pointer" onClick={() => navigate("/misCodigos")}>Mis Códigos</p>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}

export default Header;

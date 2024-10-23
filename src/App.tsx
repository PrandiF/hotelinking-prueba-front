import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./components/Login/Authentication";
import Home from "./components/Home/Home";
import MyCodes from "./components/MyCodes/MyCodes";
import fondo from "./assets/fondoHorizontal.jpg";

function App() {
  return (
    <div className="relative h-screen w-full font-roboto scroll-smooth flex flex-col font-montserrat">
      <img
        src={fondo}
        alt="fondo"
        className="flex absolute  top-0 left-0 inset-0 w-screen h-full object-cover"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/misCodigos" element={<MyCodes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

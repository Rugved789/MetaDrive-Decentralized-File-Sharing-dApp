import "../styles/nav.css";
import { Link } from "react-router-dom";
import logo from "./logo.png";
function Navbar() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="Navbar">
      <div className="logo">
        <img
          src={logo}
          alt="logo"
        />
        <h1>MetaDrive</h1>
      </div>

      <div className="navigation">
        <button className=" nav-btn features" onClick={() => scrollToSection("features")}>Features</button>
        <button className=" nav-btn working" onClick={() => scrollToSection("how-it-works")}>How it Works</button>
        <button className=" nav-btn about" onClick={() => scrollToSection("about")}>About</button>
        <Link to="/backend" className="nav-btn launch-btn">
          Launch App
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

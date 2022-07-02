import { NavLink } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="main"
        className={({ isActive }) => (isActive ? "active" : "link")}
      >
        Main
      </NavLink>
      <NavLink
        to="about"
        className={({ isActive }) => (isActive ? "active" : "link")}
      >
        About Us
      </NavLink>
      <NavLink
        to="contact"
        className={({ isActive }) => (isActive ? "active" : "link")}
      >
        Contact Us
      </NavLink>
    </div>
  );
}
export default Navbar;

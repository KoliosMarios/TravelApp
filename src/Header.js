import "./styles/Header.css";
import logo from "./logo/logo.png";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Header;

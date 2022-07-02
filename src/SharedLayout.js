import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

function SharedLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default SharedLayout;

import "./styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home_container">
      <div className="home">
        <h1 className="home_title">Welcome!</h1>
        <h3 className="home_subtitle">
          Get the most famous sights of some of the most touring cities of
          Europe.
        </h3>
        <p className="home_para">
          Just select the city you want to visit and let our list drive you
          through the most iconic attractions in that destination
        </p>
        <Link to="adminLogIn" className="btn">
          Log In as Admin
        </Link>
      </div>
    </div>
  );
}
export default Home;

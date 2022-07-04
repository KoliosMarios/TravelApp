import { useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./styles/Main.css";

function Main() {
  // set the state for the sights array
  const [sights, setSights] = useState([]);
  // set the state for the string that we put in the getSights function
  const [city, setCity] = useState("");

  // we use the str parameter here because we call different collections from firebase depending on the users option
  const getSights = async (str) => {
    const colRef = collection(db, str);
    const data = await getDocs(colRef);
    setSights(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="main">
      <div className="search">
        <label id="search_label" htmlFor="city">
          Choose a city:
        </label>
        <select
          name="city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option> </option>
          <optgroup label="UK">
            <option value="london">London</option>
            <option value="edinburgh">Edinburgh</option>
          </optgroup>
          <optgroup label="Greece">
            <option value="athens">Athens</option>
            <option value="thessaloniki">Thessaloniki</option>
          </optgroup>
        </select>
        <button
          id="get_btn"
          onClick={() => {
            getSights(city);
          }}
        >
          Get Sights
        </button>
      </div>
      <div className="sights_container">
        {sights.map((sight) => {
          return (
            <div className="present" key={sight.id}>
              <h1>{sight.name}</h1>
              <p>{sight.info}</p>
              <div className="img_container">
                <img src={sight.img} alt="img" />
              </div>
              <a
                className="sight_link"
                id="left"
                href={sight.map}
                target="_blank"
              >
                Google Map
              </a>
              <a
                className="sight_link"
                id="right"
                href={sight.site}
                target="_blank"
              >
                More information
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;

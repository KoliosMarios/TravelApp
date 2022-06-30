import { useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Main() {
  const [sights, setSights] = useState([]);
  const [city, setCity] = useState("");

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
      {sights.map((sight) => {
        return (
          <div className="present" key={sight.id}>
            <h1>{sight.name}</h1>
            <p>{sight.info}</p>
            <div className="img_container">
              <img src={sight.img} alt="img" />
            </div>
            <a className="site_link" href={sight.site} target="_blank">More information</a>
          </div>
        );
      })}
    </div>
  );
}

export default Main;

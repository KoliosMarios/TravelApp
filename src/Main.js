import { useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Main() {
  const [sites, setSites] = useState([]);
  const [city, setCity] = useState("");

  const getSites = async (str) => {
    const colRef = collection(db, str);
    const data = await getDocs(colRef);
    setSites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
            getSites(city);
          }}
        >
          Get Sites
        </button>
      </div>
      {sites.map((site) => {
        return (
          <div className="present" key={site.id}>
            <h1>{site.name}</h1>
            <p>{site.info}</p>
            <div className="img_container">
              <img src={site.img} alt="img" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Main;

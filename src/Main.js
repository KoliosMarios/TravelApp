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
    <div>
      <label htmlFor="city">Choose a city:</label>
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
        onClick={() => {
          getSites(city);
        }}
      >
        Get Sites
      </button>
      {sites.map((site) => {
        return (
          <div key={site.id}>
            <h1>Name: {site.name}</h1>
            <p>Info: {site.info}</p>
            <img src={site.img} alt="img" />
          </div>
        );
      })}
    </div>
  );
}

export default Main;

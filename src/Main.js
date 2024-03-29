import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "./styles/Main.css";

function Main() {
  // set the state for the sights array
  const [sights, setSights] = useState([]);

  //render the results for the default value
  useEffect(() => {
    const getInitSight = async () => {
      const colRef = collection(db, "athens");
      const data = await getDocs(colRef);
      setSights(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //with the dots the object is gonna have all the fields that been returned which is name and age, and then we add the id
    };

    getInitSight();
  }, []);

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
            getSights(e.target.value);
          }}
        >
          <optgroup label="Greece">
            <option value="athens" selected>
              Athens
            </option>
            <option value="thessaloniki">Thessaloniki</option>
            <option value="chania">Chania</option>
            <option value="rhodes">Rhodes</option>
          </optgroup>
          <optgroup label="UK">
            <option value="london">London</option>
            <option value="edinburgh">Edinburgh</option>
            <option value="cambridge">Cambridge</option>
            <option value="oxford">Oxford</option>
          </optgroup>
        </select>
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

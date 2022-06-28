import "./App.css";
import { useState } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [sites, setSites] = useState([]);

  const getSites = async (str) => {
    const colRef = collection(db, str);
    const data = await getDocs(colRef);
    setSites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          getSites("athens");
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

export default App;

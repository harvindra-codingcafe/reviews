import React, { useEffect, useState } from "react";
import Reviews from "./reviews";
import data from "./data";

function App() {
  const [isDataInitialized, setIsDataInitialized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("currentData") === null) {
      const storedData = data;
      localStorage.setItem("currentData", JSON.stringify(storedData));
    }
    setIsDataInitialized(true);
  }, []);

  return (
    <>
      <div className="App">
        {isDataInitialized ? <Reviews /> : <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;

import React, { useEffect } from "react";
import Reviews from "./reviews";
import data from "./data";

function App() {
  useEffect(() => {
    if (localStorage.getItem("currentData") === null) {
      const storedData = data;
      localStorage.setItem("currentData", JSON.stringify(storedData));
    }
  }, []);

  return (
    <>
      <div className="App">
        <Reviews />
      </div>
    </>
  );
}

export default App;

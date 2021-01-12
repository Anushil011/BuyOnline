import React from "react";

import "./App.css";
import Preveiw from "./Containers/preview/preview.js";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  console.log("app");
  return (
    <div className="App">
      <Navbar/>
      <Preveiw />
    </div>
  );
}

export default App;

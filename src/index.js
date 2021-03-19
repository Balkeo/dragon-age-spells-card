import React from "react";
import ReactDOM from "react-dom";

import Deck from "./Deck";

import useWindowDimensions from "./useWindowDimensions";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

function App() {
  const { width } = useWindowDimensions()
  return (
    <div className="App">
      <Deck 
        screenWidth={width}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

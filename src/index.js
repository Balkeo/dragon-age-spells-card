import React from "react";
import ReactDOM from "react-dom";

import Deck from "./Deck";

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Deck />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

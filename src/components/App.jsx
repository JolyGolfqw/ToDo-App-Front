import React from "react";
import "../styles.css";
import Input from "./Input";
import Todos from "./Todos";


const App = () => {
  console.log(process.env)
  return (
      <div className="app">
        <Input/>
        <Todos/>
      </div>
  );
};

export default App;

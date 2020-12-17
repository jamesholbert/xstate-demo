import React from "react";
import './App.css';

import { useMachine } from "@xstate/react";
import lightMachine/*, { lightMachineSimple }*/ from "./stateMachine";
import { Breaker, Switch, Light, YouWin } from "./components";

const App = () => {
  const [current, send] = useMachine(lightMachine);
  const { hasElectricity, switchIsOn } = current.context;

  return (
    <div className={`room ${current.matches("on") ? "lit" : "unlit"}`} style={{ backgroundColor: current.matches("on") ? 'white' : "black" }}>
      <header className="App-header">
        {/* Add Breaker and Switch components */}
        <Light 
          on={current.matches("on")}
          broken={current.matches("broken")}
          onClick={() => send("TOUCH")}
        />
        {current.matches("broken") && <YouWin />}
      </header>
    </div>
  );
}

export default App;

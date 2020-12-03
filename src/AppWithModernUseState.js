import React, { useState } from "react";
import './App.css';

import { Breaker, Switch, Light, YouWin } from "./components";

const App = () => {
  const [switchIsOn, setSwitchIsOn] = useState(false);
  const [breakerIsOn, setBreakerIsOn] = useState(true);
  const [broken, setBroken] = useState(false);

  const lightIsOn = switchIsOn && breakerIsOn;
  const toggle = () => setSwitchIsOn(!switchIsOn);
  const flipBreaker = () => setBreakerIsOn(!breakerIsOn);
  const touch = () => setBroken(true);

  return (
    <div className={`room ${lightIsOn ? "lit" : "unlit"}`} style={{ backgroundColor: lightIsOn ? 'white' : "black" }}>
      <header className="App-header">
        <Breaker 
          on={breakerIsOn}
          onClick={flipBreaker}
        />
        <Switch 
          on={switchIsOn}
          onClick={toggle}
        />
        <Light
          broken={broken}
          on={lightIsOn}
          onClick={touch}
        />
        {broken && <YouWin />}
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import './App.css';

import { Breaker, Switch, Light, YouWin } from "./components";

const App = () => {
  const [lightIsOn, setLightIsOn] = useState(false);
  const [switchIsOn, setSwitchIsOn] = useState(false);
  const [breakerIsOn, setBreakerIsOn] = useState(true);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setLightIsOn(switchIsOn && breakerIsOn && !broken);
  }, [switchIsOn, breakerIsOn, broken])

  // or

  // useEffect(() => {
  //   if (switchIsOn && breakerIsOn && !broken) {
  //     setLightIsOn(true);
  //   } else {
  //     setLightIsOn(false);
  //   }
  // }, [switchIsOn, breakerIsOn, broken])

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

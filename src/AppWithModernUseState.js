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

// in the case of this version of App, our test machine is in fact modeled
// correctly to reflect the behavior we want out of our App.  The App, however,
// has a bug. That being the `lightIsOn` variable, which is one of the two
// variables for the light, is independant of the `broken` variable and allows
// the app to exist in a conflicting state: both `lightIsOn` and `broken` being
// true. It would be simple to fix it, just adding a useEffect, but this
// illustrates the point about state machines being a better method for UIs. The
// more complex your app gets, the harder it is to reconcile because of hands on
// state management and human error.
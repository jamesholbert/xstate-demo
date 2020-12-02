import React, { useState, useEffect } from "react";
import './App.css';

import { useMachine } from "@xstate/react";
import uiMachine from "./stateMachine";

const App = () => {
  const [current, send] = useMachine(uiMachine);
  const { hasElectricity, switchIsOn } = current.context;

  return (
    <div className={`room ${current.matches("on") ? "lit" : "unlit"}`} style={{ backgroundColor: current.matches("on") ? 'white' : "black" }}>
      <header className="App-header">
        <Breaker 
          on={hasElectricity}
          onClick={() => send({ type: "FLIP_BREAKER" })}
        />
        <Switch 
          on={switchIsOn}
          onClick={() => send("TOGGLE")}
        />
        <Light 
          on={current.matches("on")}
          broken={current.matches("broken")}
          onClick={() => send("TOUCH")}
        />
        {current.matches("broken") && <YouLose />}
      </header>
    </div>
  );
}

const AppOld = () => {
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
        {broken && <YouLose />}
      </header>
    </div>
  );
}


const Breaker = ({ on, onClick }) => (
  <div style={{ width: "300px", backgroundColor: "white", textAlign: "center" }}>
    <img
      alt="breaker"
      className={`breaker ${on ? "electricity" : "no-electricity"}`} 
      data-testid="breaker" 
      style={imageStyles} 
      src={on ? breaker.on : breaker.off} 
      onClick={onClick} 
    />
  </div>
)

const Switch = ({ on, onClick }) => (
  <div style={{ width: "300px", backgroundColor: "white", textAlign: "center" }}>
    <img
      alt="switch"
      className={`switch ${on ? "switch-on" : "switch-off"}`} 
      data-testid="switch" 
      style={imageStyles} 
      src={on ? lightSwitch.on : lightSwitch.off} 
      onClick={onClick} 
    />
  </div>
)

const Light = ({ on, broken, onClick }) => (
  <div style={{ width: "300px", backgroundColor: "white", textAlign: "center" }}>
    <img
      alt="light"
      className={`light ${broken ? "broken" : on ? "on" : "off"}`} 
      data-testid="light" 
      style={imageStyles} 
      src={light[broken ? "broken" : on ? "on" : "off"]} 
      onClick={onClick} 
    />
  </div>
)


const AllStateApp = () => {
  const [lightIsOn, setLightIsOn] = useState(false);
  const [switchIsOn, setSwitchIsOn] = useState(false);
  const [breakerIsOn, setBreakerIsOn] = useState(true);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setLightIsOn(switchIsOn && breakerIsOn && !broken);
  }, [switchIsOn, breakerIsOn, broken])

  const toggle = () => setSwitchIsOn(!switchIsOn);
  const flipBreaker = () => setBreakerIsOn(!breakerIsOn);
  const touch = () => setBroken(true);

  return (
    <div style={{ backgroundColor: lightIsOn ? 'white' : "black" }}>
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
        {broken && <YouLose />}
      </header>
    </div>
  );
}

// export default App;
export default AppOld;

console.log("ballast" || App)
console.log("ballast" || AppOld)
console.log("ballast" || AllStateApp)

const imageStyles = { height: "250px" };

const YouLose = () => <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>You lose!</div>

const breaker = {
  on: "https://lion.ly/2Q7",
  off: "https://lion.ly/2Q8"
};

const lightSwitch = {
  on: "data:image/jpeg;base64,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",
  off: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxxp_lLBlY9hJRMNqDxXAc2v6ZKtyJ1JdySwLy_OAIdtlTLqHfNm-mN9DNaFZhMBkwjYWrJR4&usqp=CAc"
};

const light = {
  on: "https://lion.ly/2Qb",
  off: "https://lion.ly/2Qc",
  broken: "https://lion.ly/2Qd"
}

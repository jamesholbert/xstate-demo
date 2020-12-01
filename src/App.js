import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

import { useMachine } from "@xstate/react";
import uiMachine from "./stateMachine";

const imageStyles = { height: "250px" };

const breaker = {
  on: "data:image/jpeg;base64,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",
  off: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzszUhWQwzoHLYDK5S72U1Psc_ZPAk87Zl47IElXH4Dw2041T5kJXqc6o0xXr18zuahQVmRKpJ&usqp=CAc"
};

const lightSwitch = {
  on: "data:image/jpeg;base64,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",
  off: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwxxp_lLBlY9hJRMNqDxXAc2v6ZKtyJ1JdySwLy_OAIdtlTLqHfNm-mN9DNaFZhMBkwjYWrJR4&usqp=CAc"
};

const light = {
  on: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvpyPEiTFPpRzdUL_xlmJJQd_GU2el8kz5hg&usqp=CAU",
  off: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsCu7Bg78WB0Uim1LOzVIdCzvxRzNaCs6ZZtM1GUn_yNCPjbw5di_9tHBIEFp_nqDk3FslrhQ&usqp=CAc",
  broken: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjxuPEgCL7UY1kMHcOsFSDzQY5HESEhngPZw&usqp=CAU"
}

const YouLose = () => <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>You lose!</div>

const App = () => {
  const [current, send] = useMachine(uiMachine);
  const { hasElectricity, switchIsOn } = current.context;

  return (
    <div className={`room ${current.matches("on") ? "lit" : "unlit"}`} style={{ backgroundColor: current.matches("on") ? 'white' : "black" }}>
      <header className="App-header">
        <img className={`breaker ${hasElectricity ? "electricity" : "no-electricity"}`} data-testid="breaker" style={imageStyles} src={hasElectricity ? breaker.on : breaker.off} onClick={() => send("FLIP_BREAKER")} />
        <img className={`switch ${switchIsOn ? "switch-on" : "switch-off"}`} data-testid="switch" style={imageStyles} src={switchIsOn ? lightSwitch.on : lightSwitch.off} onClick={() => send("TOGGLE")} />
        {/* <img style={imageStyles} src={light[current.value]} /> */}
        <img className={`light ${current.value}`} data-testid="light" style={imageStyles} src={light[current.value]} onClick={() => send("TOUCH")} />
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
        <img className={`breaker ${breakerIsOn ? "electricity" : "no-electricity"}`} data-testid="breaker" style={imageStyles} src={breakerIsOn ? breaker.on : breaker.off} onClick={flipBreaker} />
        <img className={`switch ${switchIsOn ? "switch-on" : "switch-off"}`} data-testid="switch" style={imageStyles} src={switchIsOn ? lightSwitch.on : lightSwitch.off} onClick={toggle} />
        {/* <img style={imageStyles} src={light[lightIsOn ? "on" : "off"]} /> */}
        <img className={`light ${broken ? "broken" : lightIsOn ? "on" : "off"}`} data-testid="light" style={imageStyles} src={light[broken ? "broken" : lightIsOn ? "on" : "off"]} onClick={touch} />
        {broken && <YouLose />}
      </header>
    </div>
  );
}


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
        <img style={imageStyles} src={breakerIsOn ? breaker.on : breaker.off} onClick={flipBreaker} />
        <img style={imageStyles} src={switchIsOn ? lightSwitch.on : lightSwitch.off} onClick={toggle} />
        <img style={imageStyles} src={light[broken ? "broken" : lightIsOn ? "on" : "off"]} onClick={touch} />
      </header>
    </div>
  );
}

export default AppOld;

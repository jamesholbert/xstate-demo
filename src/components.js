import React from "react";

import switchOff from "./switchoff.jpeg";
import switchOn from "./switchon.jpeg";
import breakerOff from "./breakeroff.png";
import breakerOn from "./breakeron.png";
import lightOff from "./lightoff.jpg";
import lightOn from "./lighton.jpg";
import lightBroken from "./broken.png";

const imageStyles = { height: "250px" };

export const Breaker = ({ on, onClick }) => (
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

export const Switch = ({ on, onClick }) => (
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

export const Light = ({ on, broken, onClick }) => (
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

export const YouWin = () => <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>You win!</div>


const breaker = {
  on: breakerOn,
  off: breakerOff
};

const lightSwitch = {
  on: switchOn,
  off: switchOff
};

const light = {
  on: lightOn,
  off: lightOff,
  broken: lightBroken
}

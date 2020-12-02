import { Machine, assign } from "xstate";

const hasElectricity = (context, _event) => context.hasElectricity
const switchIsOn = (context, _event) => context.switchIsOn

const toggleSwitchContext = assign({
  switchIsOn: (context) => !context.switchIsOn
});
const flipBreakerContext = assign({
  hasElectricity: (context) => !context.hasElectricity   
});
  
const lightMachine = Machine({
  id: 'lightSwitch',
  initial: 'off',
  context: {
    hasElectricity: true,
    switchIsOn: false
  },
  on: {
  	TOUCH: "broken"
  },
  states: {
    off: {
      on: {
        TOGGLE: [
          {
            cond: "hasElectricity",
            actions: "toggleSwitchContext",
            target: "on"
          },
          {
            actions: "toggleSwitchContext"
          }
        ],
        FLIP_BREAKER: [
          {
            cond: "switchIsOn",
            actions: "flipBreakerContext",
            target: "on"
          },
          {
            actions: "flipBreakerContext"            
          }
        ]
      }
    },
    on: {
      on: {
        TOGGLE: {
          actions: assign({
            switchIsOn: () => false
          }),
          target: "off"
        },
        FLIP_BREAKER: {
          actions: assign({
            hasElectricity: () => false
          }),
          target: "off"
        },
      }
    },
    broken: {}
  },
},{
  guards: {
    hasElectricity, switchIsOn
  },
  actions: {
  	toggleSwitchContext, flipBreakerContext
  }
});

export default lightMachine;
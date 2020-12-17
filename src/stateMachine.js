import { Machine, assign } from "xstate";

// guards
const hasElectricity = (context, _event) => context.hasElectricity
const switchIsOn = (context, _event) => context.switchIsOn

// actions
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
        /*

          if electricity is on, transition to `on` otherwise, just flip the switch

        */
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
  
export const lightMachineSimple = Machine({
  id: 'lightSwitch',
  initial: 'lightIsOff',
  states: {
    lightIsOff: {
      on: {
        TOGGLE: "lightIsOn"
      }
    },
    lightIsOn: {
      on: {
        TOGGLE: "lightIsOff"
      }
    }
  },
});

export default lightMachine;
const { Machine, assign } = require("xstate");

const hasElectricity = (context, _event) => context.hasElectricity
const switchIsOn = (context, _event) => context.switchIsOn
const switchAndElecOn = context => context.hasElectricity && context.switchIsOn;

const toggleSwitchContext = assign({
  switchIsOn: (context) => !context.switchIsOn
});
const flipBreakerContext = assign({
  hasElectricity: (context) => !context.hasElectricity   
});

const switchSelector = state => `.switch.${state.context.switchIsOn ? "switch-on" : "switch-off"}`;
const breakerSelector = state => `.breaker.${state.context.hasElectricity ? "electricity" : "no-electricity"}`
const roomSelector = state => `.room.${state.matches("on") ? "lit" : "unlit"}`;
  
const testMachine = Machine({
  id: "main",
  initial: "off",
  context: {
    hasElectricity: true,
    switchIsOn: false
  },
  states: {
    off: {
      meta: {
        test: async (page, state) => {
          await page.waitForSelector(switchSelector(state));
          await page.waitForSelector(breakerSelector(state));
          await page.waitForSelector(roomSelector(state));
        },
      },
      on: {
        TOUCH_LIGHT: "broken",
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
      meta: {
        test: async page => {
          await page.waitForSelector('.light.on');
          await page.waitForSelector('.room.lit');
        },
      },
      on: {
        TOUCH_LIGHT: "broken",
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
    broken: {
      // type: "final",
      meta: {
        test: async page => {
          await page.waitForSelector('.light.broken');
          await page.waitForSelector('.room.unlit');
        },
      },
      on: {
        TOGGLE: {
          actions: "toggleSwitchContext"
        },
        FLIP_BREAKER: {
          actions: "flipBreakerContext"
        },
        TOUCH_LIGHT: [
          {
            cond: "switchAndElecOn",
            target: "on"
          },
          {
            target: "off"
          }
        ]
      }      
    }
  }
},{
  guards: {
    hasElectricity, switchIsOn, switchAndElecOn
  },
  actions: {
    toggleSwitchContext, flipBreakerContext
  }
});

module.exports.testMachine = testMachine;

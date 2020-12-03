const { Machine, assign, send } = require("xstate");

const logAction = assign({
  actions: context => context.actions + 1
})

const testMachine = Machine({
  id: "main",
  initial: "electricityOnAndSwitchOff",
  // context: {
  //   actions: 0
  // },
  states: {
    electricityOnAndSwitchOff: {
      meta: {
        test: async page => {
          await page.waitForSelector('.switch.switch-off');
          await page.waitForSelector('.breaker.electricity');
          await page.waitForSelector('.room.unlit');
        },
      },
      on: {
        TOGGLE: {
          target: "on",
          // actions: logAction
        },
        FLIP_BREAKER: {
          target: "electricityOffAndSwitchOff",
          // actions: logAction
        },
        TOUCH_LIGHT: {
          target: "broken",
          // actions: logAction
        }
      },
    },
    electricityOffAndSwitchOn: {
      meta: {
        test: async page => {
          await page.waitForSelector('.breaker.no-electricity');
          await page.waitForSelector('.switch.switch-on');
          await page.waitForSelector('.room.unlit');
        },
      },
      on: {
        TOGGLE: {
          target: "electricityOffAndSwitchOff",
          // actions: logAction
        },
        FLIP_BREAKER: {
          target: "on",
          // actions: logAction
        },
        TOUCH_LIGHT: {
          target: "broken",
          // actions: logAction
        }
      },
    },
    electricityOffAndSwitchOff: {
      meta: {
        test: async page => {
          await page.waitForSelector('.breaker.no-electricity');
          await page.waitForSelector('.switch.switch-off');
          await page.waitForSelector('.room.unlit');
        },
      },
      on: {
        TOGGLE: {
          target: "electricityOffAndSwitchOn",
          // actions: logAction
        },
        FLIP_BREAKER: {
          target: "electricityOnAndSwitchOff",
          // actions: logAction
        },
        TOUCH_LIGHT: {
          target: "broken",
          // actions: logAction
        }
      },
    },
    on: {
      meta: {
        test: async page => {
          await page.waitForSelector('.light.on');
          await page.waitForSelector('.room.lit');
        },
      },
      on: {
        TOGGLE: {
          target: "electricityOnAndSwitchOff",
          // actions: logAction
        },
        FLIP_BREAKER: {
          target: "electricityOffAndSwitchOn",
          // actions: logAction
        },
        TOUCH_LIGHT: {
          target: "broken",
          // actions: logAction
        }
      }
    },
    broken: {
      type: "final",
      meta: {
        test: async page => {
          await page.waitForSelector('.light.broken');
          await page.waitForSelector('.room.unlit');
        },
      },
    }
  }
});

module.exports.testMachine = testMachine;

const { Machine, assign, send } = require("xstate");

const testMachine = Machine({
  id: "main",
  initial: "electricityOnAndSwitchOff",
  context: {
    switchIsOn: false,
    hasElectricity: true
  },
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
        TOGGLE: "on",
        FLIP_BREAKER: "electricityOffAndSwitchOff",
        TOUCH_LIGHT: "broken"
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
        TOGGLE: "electricityOffAndSwitchOff",
        FLIP_BREAKER: "on",
        TOUCH_LIGHT: "broken"
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
        TOGGLE: "electricityOffAndSwitchOn",
        FLIP_BREAKER: "electricityOnAndSwitchOff",
        TOUCH_LIGHT: "broken"
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
        TOGGLE: "electricityOnAndSwitchOff",
        FLIP_BREAKER: "electricityOffAndSwitchOn",
        TOUCH_LIGHT: "broken"
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

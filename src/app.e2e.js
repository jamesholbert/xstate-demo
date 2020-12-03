const { Machine } = require("xstate");
const { createModel } = require("@xstate/test");

describe("light switch", () => {
  const { testMachine } = require("./testMachine");

  const testModel = createModel(testMachine, {
    events: {
      FLIP_BREAKER: async page => {
        await page.click('[data-testid="breaker"]');
      },
      TOGGLE: async page => {
        await page.click('[data-testid="switch"]');
      },
      TOUCH_LIGHT: async page => {
        await page.click('[data-testid="light"]');
      },
    },
  });

  // this lets you generate a filter that limits the number of "paths" (or tests) generated so you don't have a stack overflow
  const withActionCountLessThan = count => state => state.context.actions < count;
  // this lets you generate a filter that will limit "paths" to only include those with a given number of actions
  const withActionCounts = array => path => array.includes(path.state.context.actions);
  // this lets you generate a filter to will limit "paths" to only include those that end in a given state
  const endsInState = state => path => path.state.matches(state)

  // change one or more of the filter method params below to experiment with how many tests are automatically generated

  const testPlans = testModel.getSimplePathPlans({
    filter: withActionCountLessThan(10)
  });

  testPlans.forEach((plan, planNumber) => {
    describe(plan.description, () => {
      plan.paths
        .filter(withActionCounts([3, 4]))
        .filter(endsInState("broken"))
        .forEach((path, i) => {
          it(
            path.description,
            async () => {
              await page.setViewport({ width: 1080, height: 800 });
              await page.goto("http://localhost:3000");
              await path.test(page);
            },
            10000,
          );
        });
    });
  });

  it("coverage", () => {
    testModel.testCoverage();
  });
});

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

  // generate all tests for every combination of state transitions
  const testPlans = testModel.getSimplePathPlans();


  // get all possible paths to the `broken` state
  // const testPlans = testModel.getSimplePathPlansTo(
  //   state => state.matches("broken")
  // );

  // get all possible paths where every state/transition keeps the `hasElectricity` context value as truthy
  // const testPlans = testModel.getSimplePathPlans({
  //   filter: state => state.context.hasElectricity
  // });


  // the `getShortestPathPlans` method can end up missing states if you aren't careful
  // const testPlans = testModel.getShortestPathPlans();

  // const testPlans = testModel.getShortestPathPlansTo(
  //   state => state.matches("broken")
  // );

  console.log(`Total tests generated: ${testPlans.reduce((a, c) => a += c.paths.length, 0)}`);

  testPlans.forEach((plan, planNumber) => {
    describe(plan.description, () => {
      plan.paths
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

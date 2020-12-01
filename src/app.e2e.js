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
  // const testPlans = testModel.getShortestPathPlans();
  const testPlans = testModel.getSimplePathPlans();
  // const testPlans = testModel.getShortestPathPlans({
    // filter: state => state.context.experience.length < 3 && state.context.failedContactInfo < 2,
  // });

  console.log(testPlans.length);

  testPlans.forEach((plan, planNumber) => {
    describe(plan.description, () => {
      plan.paths.forEach((path, i) => {
        it(
          path.description,
          async () => {
            // console.log(`attempting plan #${planNumber}, path #${i}`);
            // await page.setViewport({ width: 1080, height: 800 });
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

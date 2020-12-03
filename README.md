# My xstate/state and xstate/test machine demo

## navigating app

`yarn start`

to switch between the different versions of App with different methods of handling state, toggle the commented imports in `index.js`

## running tests

`yarn e2e`

AppWithModernState.js has a bug intentionally left in that is discovered via the auto-generated tests in `app.e2e.js` (it actually _was_ an unintentional bug, which is perfect for this illustration)

tweak the referenced section in `app.e2e.js` to configure how many tests you want automatically self generated

the testMachine has verbose extra states, this is in part to ensure every possible state is *hit* to ensure every transition is accomplished and also in part due to my novice understanding of state machines :) but it gets the job done (I plan to fix this in the future)

I also added an extra context variable in the testmachine to track the number of actions, this way the auto-generated tests can be configured to test beyond the "minimum" amount of state transitions between the possible states by backtracking, otherwise, without context, it wouldn't backtrack any more than necessary.

## TL:DR:

Run the app, toggle which App you import, and run the tests to see the model based testing in action.
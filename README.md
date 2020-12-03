# My xstate/state and xstate/test machine demo

before doing anything below, don't forget to `yarn install`

## navigating app

`yarn start`

to switch between the different versions of App with different methods of handling state, toggle the commented imports in `src/index.js`

## running tests

`yarn e2e`

`AppWithModernState.js` has a bug intentionally left in that is discovered via the auto-generated tests in `src/app.e2e.js` (it actually _was_ an unintentional bug, which is perfect for this illustration)

tweak the relevant section in `app.e2e.js` to configure how many tests you want automatically self generated

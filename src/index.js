import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './AppWithStateMachine';

// import App from './AppWithModernUseState';

// import App from './AppWithVerboseUseState';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

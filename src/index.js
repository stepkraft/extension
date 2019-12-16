import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './services/AppContext';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'semantic-ui-css/semantic.min.css';
import './semantic/dist/semantic.min.css';

const tree = (
  <AppProvider>
    <App/>
  </AppProvider>
);

ReactDOM.render(tree, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

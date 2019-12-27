/*global chrome*/
// __webpack_public_path__ = chrome.extension.getURL('');

import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './services/AppContext';
import App from './App';
// import 'semantic-ui-css/semantic.min.css';
import './semantic/dist/semantic.min.css';

const tree = (
  <AppProvider>
    <App/>
  </AppProvider>
);

const app = document.createElement('div');
app.id = "extension-root";
document.body.appendChild(app);
ReactDOM.render(tree, app);
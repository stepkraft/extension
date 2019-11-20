import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { LangProvider } from './services/LangContext';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

const tree = (
  <LangProvider>
    <App/>
  </LangProvider>
);

const app = document.createElement('div');
document.body.prepend(app);
ReactDOM.render(tree, app);
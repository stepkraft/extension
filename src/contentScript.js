/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { LangProvider } from './services/LangContext';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

const tree = (
  <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/contentScript.css")} ></link>]}>
    <FrameContextConsumer>
      {
        // Callback is invoked with iframe's window and document instances
        ({document, window}) => (
          <LangProvider>
            <App/>
          </LangProvider>
        )
      }
    </FrameContextConsumer>
  </Frame>
);

const app = document.createElement('div');
app.id = "extension-root";
document.body.appendChild(app);
ReactDOM.render(tree, app);
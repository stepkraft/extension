/*global chrome*/
// __webpack_public_path__ = chrome.extension.getURL('');

import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './services/AppContext';
// import Frame, { FrameContextConsumer }from 'react-frame-component';
import App from './App';
// import 'semantic-ui-css/semantic.min.css';
import './semantic/dist/semantic.min.css';

const tree = (
  // <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/contentScript.css")} ></link>]}>
  //   <FrameContextConsumer>
  //     {
  //       // Callback is invoked with iframe's window and document instances
  //       ({document, window}) => (
          <AppProvider>
            <App/>
          </AppProvider>
  //       )
  //     }
  //   </FrameContextConsumer>
  // </Frame>
);

const app = document.createElement('div');
app.id = "extension-root";
document.body.appendChild(app);
ReactDOM.render(tree, app);
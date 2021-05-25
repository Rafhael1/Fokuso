import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'semantic-ui-css/semantic.min.css'
import 'skeleton-elements/skeleton-elements.scss';

import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root')
);

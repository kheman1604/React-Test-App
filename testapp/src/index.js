import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Home from './Components/Home';

ReactDOM.render(
  <React.Fragment>
     <BrowserRouter>
      <Home></Home>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
); 
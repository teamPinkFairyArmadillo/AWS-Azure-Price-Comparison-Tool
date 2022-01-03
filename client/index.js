
import React from 'react';
import App from './app.jsx';
import { render } from 'react-dom';
// import { Provider } from 'react-redux'
// import store from './store.js'
import './stylesheets/styles.css';

//do i need to install recoil here? 
 // <Provider store={store}>
 /* // </Provider>, */

render(
   
    <div>
    <App/>
    </div>,
   

    document.getElementById('app')
)

import React from 'react';
import App from './app.jsx';
// import { Provider } from 'react-redux'
// import store from './store.js'
import './stylesheets/styles.css';


render(
    // <Provider store={store}>
    <App/>,
    // </Provider>,

    document.getElementById('app')
)
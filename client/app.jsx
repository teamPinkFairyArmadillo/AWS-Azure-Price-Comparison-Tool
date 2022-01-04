import React from 'react';
import AzurePriceComp from './components/AzurePriceCard.jsx';
import { render } from 'react-dom';
import AwsPriceCard from './components/AwsPriceCard';
import AzureRestapi from './components/AzureRestapi.jsx';

// <AzurePriceComp/>
function App(){
  return (
    
    <div>
        <h1>Price Comparison Tool</h1>
        <AwsPriceCard /><AzurePriceComp />
    </div>
    )
}


export default App;
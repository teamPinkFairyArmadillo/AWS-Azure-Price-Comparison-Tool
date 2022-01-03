import React from 'react';
import AzurePriceComp from './components/AzurePriceCard.jsx';
import { render } from 'react-dom';
import AwsPriceCard from './components/AwsPriceCard';

function App(){
  return (
    
    <div>
        <h1>Price Comparison Tool</h1>
        <AzurePriceComp/><AwsPriceCard />
    </div>
    )
}


export default App;
//import app from '../../server/server'
import React, { Component, useState, useRef } from 'react';
import { render } from 'react-dom';
import logo from './azure_Logo.png';
import 'regenerator-runtime/runtime';

const xxx =  `https://prices.azure.com/api/retail/prices?$filter=location%20eq%20%27US%20East%202%27%20and%20skuName%20eq%20%27D2%27%20and%20serviceName%20eq%20%27Virtual%20Machines%27`


// Webpack image loader - https://www.npmjs.com/package/image-webpack-loader // CORS blocker prefix https://cors-anywhere.herokuapp.com/


function AzurePriceComp(props){
    console.log("We render the Az prc com");
    const azureCall = `https://prices.azure.com/api/retail/prices?$filter=location eq 'US East 2' and skuName eq 'D2' and serviceName eq 'Virtual Machines'`;
    const [azureInfo, setPrice] = useState({serviceName: '', retailPrice: '', location: ''});
    async function azureJSON(){
        console.log('We enter the azure call func');
        const response = await fetch(azureCall);
        console.log("We are past the first Azure request");
        console.log(response);
        const priceData = await response.json();
        setPrice(priceData.Items[0]);
        console.log(priceData.Items[0]);
    }
    azureJSON();
    return (
        <div className='azureBox'>
            <img className='logo' src={logo} alt="Logo" />
            <div className='displayTab'>

                <ul className='listGoods'>
                <li className='jsonitems'>Service:  {azureInfo.serviceName}</li><br/>
                <li className='jsonitems'>Unit Price:  ${azureInfo.retailPrice} per Hour</li><br />
                <li className='jsonitems'>Location:  {azureInfo.location}</li><br />
                </ul>


            </div>

        </div>
    )
}



export default AzurePriceComp;
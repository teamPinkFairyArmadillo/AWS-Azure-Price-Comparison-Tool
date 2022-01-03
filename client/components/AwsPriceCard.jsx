//import app from '../../server/server'
import React, { Component, useState, useRef } from 'react';
import { render } from 'react-dom';
import logo from './azure_Logo.png';
import 'regenerator-runtime/runtime';
import awsLogo from './Amazon-Web-Services-AWS-Logo.png'


// Webpack image loader - https://www.npmjs.com/package/image-webpack-loader // CORS blocker prefix https://cors-anywhere.herokuapp.com/


function AwsPriceCard(props){
    console.log("We render the AWS prc com");
    const awsCall = `https://prices.azure.com/api/retail/prices?$filter=location eq 'US East 2' and skuName eq 'D2' and serviceName eq 'Virtual Machines'`;
    const [awsInfo, setPrice] = useState({serviceName: '', retailPrice: '', location: ''});
    // async function awsJSON(){
    //     console.log('We enter the azure call func');
    //     const response = await fetch(awsCall);
    //     console.log("We are past the first AWS request");
    //     console.log(response);
    //     const priceData = await response.json();
    //     setPrice(priceData.Items[0]);
    //     console.log(priceData.Items[0]);
    // }
    // azureJSON();
    return (
        <div className='azureBox'>
            <img className='logo' src={awsLogo} alt="Logo" />
            <div className='displayTab'>

                <ul className='listGoods'>
                <li className='jsonitems'>Service:  {awsInfo.serviceName}</li><br/>
                <li className='jsonitems'>Unit Price:  ${awsInfo.retailPrice} per Hour</li><br />
                <li className='jsonitems'>Location:  {awsInfo.location}</li><br />
                </ul>


            </div>

        </div>
    )
}



export default AwsPriceCard;
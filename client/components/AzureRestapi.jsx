import React, { Component, useState, useRef } from 'react';
import { render } from 'react-dom';
import logo from './azure_Logo.png';
import 'regenerator-runtime/runtime';
import azObj from '../AzureRESTAPIEastUSCompute.json';

const memGB = 0.75;
const memGBtimes2 = memGB * 1.15;
const vCPUs = 1;
const subId = `4693f16d-2d8c-429a-b738-1ccf85469450`
const bearToke = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzFjZGU4YjNhLTQ5MDEtNDA0OS1iZWQyLTRjYzYxODMyNDU4Ny8iLCJpYXQiOjE2NDEyNDU3NTksIm5iZiI6MTY0MTI0NTc1OSwiZXhwIjoxNjQxMjQ5NjU5LCJhaW8iOiJFMlpnWU9nNHF2N3Fac1RSS3Y1dis2UnpEcnBLQWdBPSIsImFwcGlkIjoiZWI5NTQ0YmEtNjFlZC00NjVmLTgzN2QtM2U3OWNlNzYyMTRkIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMWNkZThiM2EtNDkwMS00MDQ5LWJlZDItNGNjNjE4MzI0NTg3LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiMTgzZDBlNGItODExYy00ZjY2LWE1ZTAtYWMwODQzMTU4MGFhIiwicmgiOiIwLkFXNEFPb3ZlSEFGSlNVQy0wa3pHR0RKRmg3cEVsZXZ0WVY5R2czMC1lYzUySVUxdUFBQS4iLCJzdWIiOiIxODNkMGU0Yi04MTFjLTRmNjYtYTVlMC1hYzA4NDMxNTgwYWEiLCJ0aWQiOiIxY2RlOGIzYS00OTAxLTQwNDktYmVkMi00Y2M2MTgzMjQ1ODciLCJ1dGkiOiIxNlNGZEpBcmdrQzJfQk4tNERZdEFnIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjE0NjgyODk3NDV9.mwaYxJyROgpsxr_GzcqU4NR9f5rSPdUVauJq_VCBV-lLYe0msWy08WxRfBjXGtO9mpCX2U6jwsv7mlZKRyRcjgM5Z_H1MZRVnv6lsOSIr1B0r4XT9OJbFaesILyttIeShOuwqdNO6CN-z_jZQnM5m2a53Jj9ulz-VjZp0hDFL-qe1UHG1ZeuVxnih1WvEhZj0EgUaTuFDzKjKyh3wB_-YBxk4hnexb576SlwH3er1veYzpM5rveuBneU6L2AsJeFlenYKw-ZN0BNam2nHg3_9yqJbmP1hc95okQbiZhLulvHMPhnqOWXP8UC5lj09yUy4PYiS5T1-mqenWh6swNAug`
// Webpack image loader - https://www.npmjs.com/package/image-webpack-loader // CORS blocker prefix https://cors-anywhere.herokuapp.com/
function doesVMmeetMinReq(arr){
    const filtArr = [];
    for (let i=0; i<arr.length; i++){
        if (arr[i].capabilities[2].value >= vCPUs &&(arr[i].capabilities[5].value <= memGBtimes2 && arr[i].capabilities[5].value >= memGB)){
            let skuStr = arr[i].name.replace('Basic_', '');
            skuStr = skuStr.replace('Standard_', '');
            skuStr = skuStr.replace('Premium_', '');
            filtArr.push(skuStr)
        }
    }
    const uniq = [...new Set(filtArr)];
    return uniq;
}

function AzureRestapi(props){
    console.log("We render the Az rest api com");
    const azureRestCall = `https://management.azure.com/subscriptions/`+subId+`/providers/Microsoft.Compute/skus?api-version=2021-07-01&$filter=location eq 'westus'`;
    const [azureRestInfo, setArr] = useState({serviceName: '', retailPrice: '', location: ''});
    const [setInfoOnceRest, setInfoRest] = useState(false);
    async function azureRestJSON(){
        console.log('We enter the azure REST call func');
        if (!setInfoOnceRest){
            //setInfoOnce = true;
            setInfoRest(true);
            const response = await fetch(azureRestCall, {
                method: 'GET',
                headers: new Headers({'Authorization': bearToke})
            });
            const prodData = await response.json();
            console.log(prodData)
            const virMac = prodData.value.filter(word => word.resourceType === 'virtualMachines');
            setArr(azureRestInfo);
            const listOfmatched = doesVMmeetMinReq(virMac);
            console.log(listOfmatched);
        }

    }
    azureRestJSON();
    return (
        <div className='azureBox'>
            <img className='logo' src={logo} alt="Logo" />
            <div className='displayTab'>

                <ul className='listGoods'>
                <li className='jsonitems'>Service:  {azureRestInfo.serviceName}</li><br/>
                <li className='jsonitems'>Unit Price:  ${azureRestInfo.retailPrice} per Hour</li><br />
                <li className='jsonitems'>Location:  {azureRestInfo.location}</li><br />
                </ul>


            </div>

        </div>
    )
}



export default AzureRestapi;
import React, { Component, useState, useRef } from "react";
import { render } from "react-dom";
import logo from "./azure_Logo.png";
import "regenerator-runtime/runtime";
// Get the local DB
import azObj from "../AzureRESTAPIEastUSCompute.json";
const submittedInfo = useSelector((state) => state.userInput);
// Change these three variables to be the user input - then the doesVMmeetMinReq function will need to be updated
// const memGB = 1;
// const memGBtimes2 = memGB * 1.25;
// const vCPUs = 1;

const memGB = submittedInfo.RAM;
const memGBtimes2 = memGB * 1.25;
const vCPUs = submittedInfo.vCPU;

// Webpack image loader - https://www.npmjs.com/package/image-webpack-loader // CORS blocker prefix https://cors-anywhere.herokuapp.com/

function AzurePriceComp(props) {
  // Hooks - >>>
  let minPrice = Infinity;
  let minPriceObj;
  const [azureInfo, setPrice] = useState({
    serviceName: "",
    retailPrice: "",
    location: "",
  });
  function doesVMmeetMinReq(arr) {
    //This function will take an array and check if the items meet the criteria - vCPUs, memGB etc.
    const filtArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].capabilities[2].value >= vCPUs &&
        arr[i].capabilities[5].value <= memGBtimes2 &&
        arr[i].capabilities[5].value >= memGB
      ) {
        let skuStr = arr[i].name.replace("Basic_", "");
        skuStr = skuStr.replace("Standard_", "");
        skuStr = skuStr.replace("Premium_", "");
        filtArr.push(skuStr);
      }
    }
    const uniq = [...new Set(filtArr)];
    return uniq;
  }
  const [setInfoOnce, setInfo] = useState(false);
  // Remove items in the array that are not VMs
  const virMac = azObj.value.filter(
    (word) => word.resourceType === "virtualMachines"
  );
  // Check if the VMs meet min requirements
  const listOfmatched = doesVMmeetMinReq(virMac);
  const listOfAzProducts = virMac;
  // We have the array of product names. Now we will make a request for the prices of those products.
  const bigArr = [];
  async function azureJSON(prod) {
    const azureCall =
      `https://prices.azure.com/api/retail/prices?$filter=location eq 'US East 2' and skuName eq '` +
      prod +
      `' and serviceName eq 'Virtual Machines'`;
    console.log("We enter the azure call func");
    if (!setInfoOnce) {
      setInfo(true);
      // These two APIs will take about 5 to 10 seconds each time
      const response = await fetch(azureCall);
      const priceData = await response.json();
      if (
        priceData.Items[0].retailPrice < azureInfo.retailPrice ||
        azureInfo.retailPrice === ""
      ) {
        // This is the hook that will set the price to the object which contains the lowest price
        setPrice(priceData.Items[0]);
      }
    }
  }
  // From the array of products that matched the criteria - query the azure api price for each
  for (let i = 0; i < listOfmatched.length; i++) {
    azureJSON(listOfmatched[i]);
    //setInfo(false);
  }
  // listOfmatched.map(item => azureJSON);
  return (
    <div className="azureBox">
      <img className="logo" src={logo} alt="Logo" />
      <div className="displayTab">
        <ul className="listGoods">
          <li className="jsonitems">Service: {azureInfo.serviceName}</li>
          <br />
          <li className="jsonitems">
            Unit Price: ${azureInfo.retailPrice} per Hour
          </li>
          <br />
          <li className="jsonitems">Location: {azureInfo.location}</li>
          <br />
        </ul>
      </div>
    </div>
  );
}

export default AzurePriceComp;

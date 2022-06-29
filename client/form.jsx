import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  storeUserInput,
  storeAzureResults,
  storeAwsResults,
} from "./features/configuration.js";
import { AzurePriceComp } from "./components/AzureApiCall";
import azObj from "./AzureRESTAPIEastUSCompute.json";
const awsPrices = require("../server/awsProduct.json");

//form component
function Form() {
  const [region, setRegion] = useState("");
  const [OS, setOS] = useState("");
  const [vCPU, setvCPU] = useState("");
  const [RAM, setRAM] = useState("");
  const [numberOfVMs, setNumberOfVMs] = useState("");
  const [hoursPerMonth, setHoursPerMonth] = useState("");
  const [diskSize, setDiskSize] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submittedInfo = useSelector((state) => state.userInput);
  const awsResultsState = useSelector((state) => state.awsResults);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(region, OS, vCPU);
    const submittedInfo = {
      region: region,
      OS: OS,
      vCPU: vCPU,
      RAM: RAM,
      num_VM: numberOfVMs,
      hoursPerMonth: hoursPerMonth,
      diskSize: diskSize,
    };

    //take an object and dispatch it to configuration reducer
    dispatch(storeUserInput(submittedInfo));

    //awsCalc function returns object with calculations, instance types, etc.
    const awsResults = awsCalc(submittedInfo);
    console.log("awsResults", awsResults);
    dispatch(
      storeAwsResults({
        instanceType: awsResults.instanceType,
        totalCost: awsResults.awsTotal,
      })
    );
    const azureResults = azureCalc(submittedInfo);
    dispatch(storeAzureResults(azureResults));

    // dispatch(storeAzureResults({

    // }))
    // .then(() => console.log("awsResultsState: ", awsResultsState));
    // console.log("awsResultsState: ", awsResultsState);
    // .then((awsCostData) => dispatch(storeAwsResults(awsCostData)))
    // .then(() => console.log("awsResultsState: ", awsResultsState));

    //invoke calculation functions from awscalcs.js and azurecalcs.js
    //once data is recieved, dispatch redux

    //if successful, navigate to dashboard page. no state passed in bc using redux

    //use .then chaining => navigate('/dashboard')
    navigate("/dashboard");
  }

  //functions for AWS & Azure calculations
  function awsCalc(submittedInfo) {
    console.log("submittedInfo in awsCalc:", submittedInfo);
    awsPrices.forEach((obj) => {
      obj.vcpu = parseInt(obj.vcpu);
      if (obj.memory) {
        obj.memory = parseInt(obj.memory);
        // obj.memory.replace(/\D/ig, "");
      }
      obj.pricePerUnit = parseFloat(obj.pricePerUnit);
    });
    console.log("This is the first object of the array", awsPrices[0]);

    const lowestAwsPrice = () => {
      let minPrice = {
        pricePerUnit: Infinity,
      };
      awsPrices.forEach((obj) => {
        if (
          submittedInfo.vCPU >= obj.vcpu &&
          submittedInfo.vCPU <= obj.vcpu * 1.25 &&
          submittedInfo.RAM >= obj.memory &&
          submittedInfo.RAM <= obj.memory * 1.25 &&
          obj.pricePerUnit < minPrice.pricePerUnit
        ) {
          minPrice = obj;
        }
      });
      if (minPrice.pricePerUnit === Infinity) {
        minPrice.instanceType = "t1.micro";
        minPrice.pricePerUnit = 0.02;
      }
      return minPrice;
    };

    const awsInstanceTypeToUse = lowestAwsPrice();
    console.log("awsInstanceTypeToUse", awsInstanceTypeToUse);

    //numofVMs and hoursPerMonth defined based on user inputs
    const awsVmSubTotal =
      awsInstanceTypeToUse.pricePerUnit *
      submittedInfo.num_VM *
      submittedInfo.hoursPerMonth;

    //Good enough for minimum vialble product. 10 cents per GB. Source: https://calculator.aws/#/createCalculator/EC2
    const awsStorageSubTotal =
      submittedInfo.diskSize * 0.1 * submittedInfo.num_VM;

    //Total per month
    const awsTotal = awsVmSubTotal + awsStorageSubTotal;

    const objToExport = {
      // Show instanceType and awsTotal on the cards. The rest is for stretch goals.
      instanceType: awsInstanceTypeToUse.instanceType,
      vcpu: awsInstanceTypeToUse.vcpu,
      memory: awsInstanceTypeToUse.memory,
      pricePerUnit: awsInstanceTypeToUse.pricePerUnit,
      awsVmSubTotal: awsVmSubTotal,
      awsStorageSubTotal: awsStorageSubTotal,
      awsTotal: awsTotal,
    };

    return objToExport;
  }

  function azureCalc(submittedInfo) {
    const memGB = submittedInfo.RAM;
    const memGBtimes2 = memGB * 1.25;
    const vCPUs = submittedInfo.vCPU;
    let finalObj = {};
    // Hooks - >>>
    let minPrice = Infinity;
    let minPriceObj;
    let azureInfo = { serviceName: "", retailPrice: "", location: "" };
    // const [azureInfo, setPrice] = useState({
    //   serviceName: "",
    //   retailPrice: "",
    //   location: "",
    // });
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
    // const [setInfoOnce, setInfo] = useState(false);
    let setInfoOnce = false;
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
        // setInfo(true);
        setInfoOnce = true;
        // These two APIs will take about 5 to 10 seconds each time
        const response = await fetch(azureCall);
        const priceData = await response.json();
        if (
          priceData.Items[0].retailPrice < azureInfo.retailPrice ||
          azureInfo.retailPrice === ""
        ) {
          // This is the hook that will set the price to the object which contains the lowest price
          // azureInfo = priceData.Items[0];
          console.log("priceData in azureCalc", priceData.Items);
          finalObj = priceData.Items[0];
          dispatch(
            storeAzureResults({
              instanceType: finalObj.armSkuName,
              totalCost: finalObj.retailPrice,
            })
          );
          // return finalObj;
        }
      }
    }
    // From the array of products that matched the criteria - query the azure api price for each
    for (let i = 0; i < listOfmatched.length; i++) {
      azureJSON(listOfmatched[i]);
      //setInfo(false);
    }
    // listOfmatched.map(item => azureJSON);
    console.log("finalObj");
    return finalObj;
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      ></link>

      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Price Comparison Tool for AWS and Azure Cloud Services
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Region
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                      >
                        <option>Select Region</option>
                        <option value="northAmericaEast">
                          North America East
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Operating System
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={OS}
                        onChange={(e) => setOS(e.target.value)}
                      >
                        <option>Select OS</option>
                        <option value="windows"> Windows</option>
                        <option value="linux">Linux</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        vCPU
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter # of vCPU"
                        id="vCPU"
                        onChange={(e) => setvCPU(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        RAM
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter # of RAM"
                        id="RAM"
                        onChange={(e) => setRAM(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Number of VMs
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter # of VMs"
                        id="numberOfVMs"
                        onChange={(e) => setNumberOfVMs(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Hours Per Month
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter hours per month"
                        id="hoursPerMonth"
                        onChange={(e) => setHoursPerMonth(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Disk Size
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter disk size"
                        id="diskSize"
                        onChange={(e) => setDiskSize(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* <hr className="mt-6 border-b-1 border-blueGray-300"> */}

                <button
                  className="bg-blue-700 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                >
                  Configure Estimate
                </button>
              </form>
            </div>
          </div>
          <footer className="relative  pt-8 pb-6 mt-2">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1"></div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default Form;

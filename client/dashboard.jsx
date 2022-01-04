import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  //this page would only render if redux dispatch AND api call successful

  //access state by using useSelector, need to take a look at what API call returns to check where calculations are being done
  //card component might require using an UI component library
  return (
    <section>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      ></link>
      <section className="bg-blueGray-400">
        <header className="bg-white shadow-sm w-full  top-0 ">
          <div className="max-auto  px-8 py-4 bg-blueGray-400"></div>
          <div className="text-center">
            <div className="app-name "></div>
          </div>
        </header>
        <header className="bg-blueGray-50 w-full top-0 ">
          <div className="max-auto  px-8 py-12 bg-blueGray-50">
            <div className="flex justify-between">
              <div className="welcomecopy flex items-center space-x-4 mr-10">
                <h1 className="text-black text-4xl font-bold">
                  Lowest quote for services:
                  <br />$<span className="font-mono text-blue-700">5.95 </span>
                </h1>
              </div>
              <div className=" menu flex justify-end  items-center  flex-1 space-x-4">
                {/* <img className="h-12 rounded-full border border-gray-100 shadow-sm" src="https://randomuser.me/api/portraits/men/11.jpg" alt="user image"></img> */}
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col bg-blueGray-50 m-auto p-auto">
          <h1 className="text-2xl font-light px-10 py-5">Providers:</h1>
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap ml-10">
              <div className="inline-block mr-10">
                <div className=" px-8 py-8 bg-white w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img
                    src="https://www.danslenuage.quebec/wp-content/uploads/sites/100/2020/01/aws.png"
                    className="logo-area h-4"
                  ></img>
                  <h3 className="py-2 text-4xl font-bold font-mono">$5.95</h3>
                  <p className="text-xs">example text</p>
                  <div className="text-center mt-2 leading-none flex justify-between w-full">
                    <span className=" mr-3 inline-flex items-center leading-none text-sm  py-1 ">
                      AWS
                    </span>
                    <span className=" inline-flex items-center leading-none text-sm">
                      View number
                    </span>
                  </div>
                </div>
              </div>
              <div className="inline-block">
                <div className=" px-8 py-8 bg-white w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <img
                    src="https://logos-world.net/wp-content/uploads/2021/05/Azure-Logo-700x394.png"
                    className="logo-area h-4"
                  ></img>
                  <h3 className="py-2 text-4xl font-bold font-mono">$6.10</h3>
                  <p className="text-xs">example text</p>
                  <div className="text-center mt-2 leading-none flex justify-between w-full">
                    <span className=" mr-3 inline-flex items-center leading-none text-sm  py-1 ">
                      Azure
                    </span>
                    <span className=" inline-flex items-center leading-none text-sm">
                      View number
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Dashboard;

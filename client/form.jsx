import React,{useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';


function Form (){
    const [region, setRegion] = useState('');
    const [OS, setOS] = useState('');
    const [vCPU, setvCPU] = useState('');
    const [RAM, setRAM] = useState(''); 
    const [numberOfVMs, setNumberOfVMs] = useState(''); 
    const [hoursPerMonth, setHoursPerMonth] = useState(''); 
    const [diskSize, setDiskSize] = useState(''); 

    //declaring dispatch to dispatch to redux 
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    
    function handleSubmit(e){
        e.preventDefault();
        console.log(region, OS, vCPU, )

        //invoke calculation functions from awscalcs.js and azurecalcs.js

        //once data is recieved, dispatch redux 
        //if successful, navigate to dashboard page. no state passed in bc using redux 

        //use .then chaining => navigate('/dashboard')
        

    }
    

    return(
        <div>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"></link>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>
        
        
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
                      <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={region} onChange={(e) => setRegion(e.target.value)}> 
                    <option>Select Region</option>          
                    <option value="northAmericaEast">North America East</option>
                  </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        Operating System
                      </label>
                      <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value = {OS} onChange={(e) => setOS(e.target.value)}>
                        <option>Select OS</option>
                        <option value="windows"> Windows</option>
                        <option value="linux">Linux</option>
                    </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        vCPU
                      </label>
                      <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Enter # of vCPU" id="vCPU" onChange={(e) => setvCPU(e.target.value)}></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        RAM
                      </label>
                      <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Enter # of RAM" id="RAM" onChange={(e) => setRAM(e.target.value)}></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        Number of VMs
                      </label>
                      <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Enter # of VMs" id="numberOfVMs" onChange={(e) => setNumberOfVMs(e.target.value)}></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        Hours Per Month
                      </label>
                      <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Enter hours per month"  id="hoursPerMonth" onChange={(e) => setHoursPerMonth(e.target.value)}></input>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                        Disk Size
                      </label>
                      <input type="number" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Enter disk size"  id="diskSize" onChange={(e) => setDiskSize(e.target.value)}></input>
                    </div>
                  </div>
                 
                </div>
        
                {/* <hr className="mt-6 border-b-1 border-blueGray-300"> */}
        
        
                <button className="bg-blue-700 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button" onClick={(e) => handleSubmit(e)}>
                  Configure Estimate
                </button>
              </form>
              <button onClick={() => navigate('/dashboard')}>Navigate to Dashboard</button>
        
            </div>
          </div>
          <footer className="relative  pt-8 pb-6 mt-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
        </section>
        </div>
    )

}

export default Form;
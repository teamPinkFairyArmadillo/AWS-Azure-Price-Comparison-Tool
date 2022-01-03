import React,{useState} from 'react';
import { useDispatch } from 'react-redux'; 



function Form (){
    const [region, setRegion] = useState('');
    const [OS, setOS] = useState('');
    const [vCPU, setvCPU] = useState('');
    const [RAM, setRAM] = useState(''); 
    const [numberOfVMs, setNumberOfVMs] = useState(''); 
    const [hoursPerMonth, setHoursPerMonth] = useState(''); 
    const [diskSize, setDiskSize] = useState(''); 


     function handleSubmit(e){
        e.preventDefault();

        //fetch request to backend to recieve data 
        //once data is recieved, dispatch redux 
        //if successful, navigate to dashboard page. no state passed in bc using redux 
    }
    

    return(
        <div id="formBox">
        <h3>Configure Estimate</h3>
        <form onSubmit={handleSubmit}>
        
        <label>
          Region
          <select value={region} onChange={(e) => setRegion(e.target.value)}> 
            <option>Select Region</option>          
            <option value="northAmericaEast">North America East</option>
          </select>
        </label>

        <label>
            OS
            <select value = {OS} onChange={(e) => setOS(e.target.value)}>
                <option>Select OS</option>
                <option value="windows"> Windows</option>
                <option value="linux">Linux</option>
            </select>
        </label>       
        <label>
            vCPU
            <input type="number" pattern="[0-9]*" id="vCPU" onChange={(e) => setvCPU(e.target.value)}></input>
        </label>
        <label>
            RAM
            <input type="text" pattern="[0-9]*" id="RAM" onChange={(e) => setRAM(e.target.value)}></input>
        </label>
        <label>
            Number of VMs
            <input type="text" pattern="[0-9]*" id="numberOfVMs" onChange={(e) => setNumberOfVMs(e.target.value)}></input>
        </label>
        <label>
            Hours Per Month
            <input type="text" pattern="[0-9]*" id="hoursPerMonth" onChange={(e) => setHoursPerMonth(e.target.value)}></input>
        </label>
        <label>
            Disk Size
            <input type="text" pattern="[0-9]*" id="diskSize" onChange={(e) => setDiskSize(e.target.value)}></input>
        </label>
        <input type="submit" id="submit" value="Submit"/>
      </form>
      </div>
    )

}

export default Form;
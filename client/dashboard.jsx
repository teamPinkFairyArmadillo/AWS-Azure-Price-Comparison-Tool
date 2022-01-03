import React,{useState, useEffect} from 'react';
import {useSelector } from 'react-redux';

function Dashboard(){
//this page would only render if redux dispatch AND api call successful 

//access state by using useSelector, need to take a look at what API call returns to check where calculations are being done 
//card component might require using an UI component library
    return(
        <h3>This is the dashboard</h3>
    )

}

export default Dashboard; 
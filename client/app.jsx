import React from 'react';
import Form from './form.jsx';
import Dashboard from './dashboard.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { calc } from './features/configuration';

function App(){
  const config = useSelector(state => state.config)
  const dispatch = useDispatch();
  return (
    <Router>
    <Routes>
     <Route path='/' element={<Form/>}/>
     <Route path="dashboard" element={<Dashboard/>}/>
    </Routes>
   </Router> 
    )
}


export default App;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calc } from './features/configuration';

function App() {
  const config = useSelector(state => state.config)
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(calc({ region: 'US WEST' }))
  }
  return (
    <div>
      <h1>Price Comparison Tool</h1>
    </div>
  )
}


export default App;
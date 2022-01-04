import { createSlice } from '@reduxjs/toolkit';


const initialStateValue = {
  region: '',
  OS: '',
  instance_series: '',
  num_VM: 1,
  
}

//REDUCERS
export const configurationSlice = createSlice({
  name: 'configuration',
  initialState: { value: initialStateValue },
  reducers: {
    calc: (state, action) => {
      state.value = action.payload;
    },
    reset: (state, action) => {
      state.value = initialStateValue
    },
  }
});

export const { calc, reset } = configurationSlice.actions;

export default configurationSlice.reducer;


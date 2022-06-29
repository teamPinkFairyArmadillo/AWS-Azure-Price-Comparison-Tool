import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  userInput: {
    region: "",
    OS: "",
    vCPU: 0,
    RAM: 0,
    num_VM: 1,
    hoursPerMonth: 0,
    diskSize: 0,
  },
  azureResults: {
    instanceType: "",
    totalCost: 0,
  },
  awsResults: {
    instanceType: "",
    totalCost: 0,
  },
};

//REDUCERS
export const configurationSlice = createSlice({
  name: "configuration",
  initialState: initialStateValue,
  reducers: {
    storeUserInput: (state, action) => {
      // console.log("action.payload", action.payload);
      state.userInput = action.payload;
    },
    reset: (state, action) => {
      state.userInput = initialStateValue;
    },
    storeAzureResults: (state, action) => {
      console.log("logging action.payload in azureResults:", action.payload);
      state.azureResults = action.payload;
    },
    storeAwsResults: (state, action) => {
      // console.log("action.payload for awsResults:", action.payload);
      state.awsResults = action.payload;
      // console.log("logging state in storeAwsResults:", state.awsResults);
    },
  },
});

export const { storeUserInput, reset, storeAzureResults, storeAwsResults } =
  configurationSlice.actions;

export default configurationSlice.reducer;

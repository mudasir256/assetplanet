import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoe: false,
  clientInfoObject: {
    ClientInfoForm: {},
    SpousePartnerForm: {},
    DependentsForm: {},
    TrustForm: {},
    CorporateForm: {},
    CharityForm: {},
    OthersFinanciallyImpactedForm: {},
  },

};

// A slice for client info with our 2 reducers
const clientInfoSlice = createSlice({
  name: "clientInfo",
  initialState,
  reducers: {
    setClientInfoObject: (state, action) => {
    //   console.log("in client info slice payload client data", payload);

    //   console.log("stateeeeeeeeeeeee", state.shoe);
      // console.log("stateeeeeeeeeeeee", state);

      const formData ={... state.clientInfoObject};

      const formName = action.payload.formName
      console.log("formname",formName);


      delete action.payload["formName"]

      formData[formName] = [action.payload];


      state.clientInfoObject = formData;

      // delete state.clientInfoObject["formName"]

      // console.log("client info object", state.clientInfoObject);
    },
  },
});

// Two actions generated from the slice
export const { setClientInfoObject } = clientInfoSlice.actions;

// The reducer
export default clientInfoSlice.reducer;

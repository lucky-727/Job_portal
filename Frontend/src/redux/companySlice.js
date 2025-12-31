import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    // initial state for company details
    singleCompany: null,
  },
  reducers: {
    // reducers for company details
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
  },
});

// Export the actions

export const { setSingleCompany } = companySlice.actions;

// Export the reducer
export default companySlice.reducer;

// Export the companySlice if needed
export { companySlice };
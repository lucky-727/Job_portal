import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    // initial state for company details
    singleCompany: {}, // initialise singleCompany as an empty object
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    // reducers for company details
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
     setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

// Export the actions

export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;

// Export the reducer
export default companySlice.reducer;

// Export the companySlice if needed
export { companySlice };
import { createSlice } from '@reduxjs/toolkit';
export const countiesSlice = createSlice({
    name: 'countiesSlice',
    initialState: {
        counties: [],
        infoCounty: [],
        showSchools: [],
    },
    reducers: {
        get: (state, action) => {
            state.counties = action.payload;
        },
        show: (state, action) => {
            state.showSchools = action.payload;
        },
        info: (state, action) => {
            state.infoCounty = action.payload;
        },
    },
})

export const countiesActions = countiesSlice.actions

export default countiesSlice.reducer
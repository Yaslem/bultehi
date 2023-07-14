import { createSlice } from '@reduxjs/toolkit';
export const yearsSlice = createSlice({
    name: 'yearsSlice',
    initialState: {
        years: [],
        editYear: [],
    },
    reducers: {
        get: (state, action) => {
            state.years = action.payload;
        },
        edit: (state, action) => {
            state.editYear = action.payload;
        },
    },
})

export const yearsActions = yearsSlice.actions

export default yearsSlice.reducer
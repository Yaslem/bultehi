import { createSlice } from '@reduxjs/toolkit';
export const educationYearSlice = createSlice({
    name: 'educationYearSlice',
    initialState: {
        year: '2022',
        default: '2022',
    },
    reducers: {
        get: (state, action) => {
            state.year = action.payload;
        },
    },
})

export const educationYearActions = educationYearSlice.actions

export default educationYearSlice.reducer
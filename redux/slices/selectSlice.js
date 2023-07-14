import { createSlice } from '@reduxjs/toolkit';
export const selectSlice = createSlice({
    name: 'selectSlice',
    initialState: {
        is: {
            open: false,
            states: false,
            schools: false,
            counties: false
        },
    },
    reducers: {
        setStates: (state, action) => {
            state.is.states = action.payload;
            state.is.schools = false;
            state.is.counties = false;
            state.is.open = false;
        },
        setSchools: (state, action) => {
            state.is.states = false;
            state.is.schools = action.payload;
            state.is.counties = false;
            state.is.open = false;
        },
        setCounties: (state, action) => {
            state.is.states = false;
            state.is.schools = false;
            state.is.open = false;
            state.is.counties = action.payload;
        },
        setOpen: (state, action) => {
            state.is.states = false;
            state.is.schools = false;
            state.is.counties = false;
            state.is.open = action.payload;
        },
    },
})

export const selectActions = selectSlice.actions

export default selectSlice.reducer
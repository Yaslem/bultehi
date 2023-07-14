import { createSlice } from '@reduxjs/toolkit';
export const middleSlice = createSlice({
    name: 'middleSlice',
    initialState: {
        middle: [],
        filter: [],
        showStudents: [],
        states: [],
        counties: [],
        schools: [],
    },
    reducers: {
        get: (state, action) => {
            state.middle = action.payload;
        },
        setStates: (state, action) => {
            state.states = action.payload;
        },
        setCounties: (state, action) => {
            state.counties = action.payload;
        },
        setSchools: (state, action) => {
            state.schools = action.payload;
        },
        setShowStudents: (state, action) => {
            state.showStudents = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
})

export const middleActions = middleSlice.actions

export default middleSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
export const highsSlice = createSlice({
    name: 'highsSlice',
    initialState: {
        high: [],
        filter: [],
        showStudents: [],
        states: [],
        counties: [],
        schools: [],
    },
    reducers: {
        get: (state, action) => {
            state.high = action.payload;
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

export const highsActions = highsSlice.actions

export default highsSlice.reducer
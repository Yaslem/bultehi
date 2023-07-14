import { createSlice } from '@reduxjs/toolkit';
export const elementarySlice = createSlice({
    name: 'elementarySlice',
    initialState: {
        elementary: [],
        filter: [],
        showStudents: [],
        states: [],
        counties: [],
        schools: [],
        show: {
            data: [],
            isOpen: false,
        },
    },
    reducers: {
        get: (state, action) => {
            state.elementary = action.payload;
        },
        show: (state, action) => {
            state.show.data = action.payload;
        },
        setOpen: (state, action) => {
            state.show.isOpen = action.payload;
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

export const elementaryActions = elementarySlice.actions

export default elementarySlice.reducer
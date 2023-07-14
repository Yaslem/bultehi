import { createSlice } from '@reduxjs/toolkit';
export const statesSlice = createSlice({
    name: 'statesSlice',
    initialState: {
        states: [],
        infoState: [],
        howCounties: [],
    },
    reducers: {
        get: (state, action) => {
            state.states = action.payload;
        },
        show: (state, action) => {
            state.howCounties = action.payload;
        },
        info: (state, action) => {
            state.infoState = action.payload;
        },
    },
})

export const statesActions = statesSlice.actions

export default statesSlice.reducer
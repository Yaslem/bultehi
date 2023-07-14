import { createSlice } from '@reduxjs/toolkit';
export const topSlice = createSlice({
    name: 'topSlice',
    initialState: {
        high: {
            data: [],
        },
        middle: {
            data: [],
        },
        elementary: {
            data: [],
        },
    },
    reducers: {
        high: (state, action) => {
            state.high.data = action.payload;
        },
        middle: (state, action) => {
            state.middle.data = action.payload;
        },
        elementary: (state, action) => {
            state.elementary.data = action.payload;
        },
    },
})

export const topActions = topSlice.actions
export default topSlice.reducer
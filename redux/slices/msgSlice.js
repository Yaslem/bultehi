import { createSlice } from '@reduxjs/toolkit';
export const msgSlice = createSlice({
    name: 'msgSlice',
    initialState: {
        isTrue: false,
    },
    reducers: {
        isTrue: (state, action) => {
            state.isTrue = action.payload;
        },
    },
})

export const msgActions = msgSlice.actions

export default msgSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
export const showResultSlice = createSlice({
    name: 'showResultSlice',
    initialState: {
        data: [],
        isOpen: false,
    },
    reducers: {
        show: (state, action) => {
            state.data = action.payload;
        },
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
})

export const showResultActions = showResultSlice.actions

export default showResultSlice.reducer
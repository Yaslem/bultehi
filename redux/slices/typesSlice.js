import { createSlice } from '@reduxjs/toolkit';
export const typesSlice = createSlice({
    name: 'typesSlice',
    initialState: {
        types: [],
        editType: [],
    },
    reducers: {
        get: (state, action) => {
            state.types = action.payload;
        },
        edit: (state, action) => {
            state.editType = action.payload;
        },
    },
})

export const typesActions = typesSlice.actions

export default typesSlice.reducer
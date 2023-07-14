import { createSlice } from '@reduxjs/toolkit';
export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
        high: {
            isSearch: false,
            search: [],
            query: '',
        },
        middle: {
            isSearch: false,
            search: [],
        },
        elementary: {
            isSearch: false,
            search: [],
        },

    },
    reducers: {
        getHigh: (state, action) => {
            state.high.search = action.payload;
        },
        isSearchHigh: (state, action) => {
            state.high.isSearch = action.payload;
        },
        queryHigh: (state, action) => {
            state.high.query = action.payload;
        },
        getMiddle: (state, action) => {
            state.middle.search = action.payload;
        },
        isSearchMiddle: (state, action) => {
            state.middle.isSearch = action.payload;
        },
        queryMiddle: (state, action) => {
            state.middle.query = action.payload;
        },
        getElementary: (state, action) => {
            state.elementary.search = action.payload;
        },
        queryElementary: (state, action) => {
            state.elementary.query = action.payload;
        },
        isSearchElementary: (state, action) => {
            state.elementary.isSearch = action.payload;
        },
    },
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer
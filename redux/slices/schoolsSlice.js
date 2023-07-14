import { createSlice } from '@reduxjs/toolkit';
export const schoolsSlice = createSlice({
    name: 'schoolsSlice',
    initialState: {
        schools: [],
        profile: [],
        schoolsShow: [],
    },
    reducers: {
        get: (state, action) => {
            state.schools = action.payload;
        },
        show: (state, action) => {
            state.schoolsShow = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
})

export const schoolsActions = schoolsSlice.actions

export default schoolsSlice.reducer
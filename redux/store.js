import { configureStore } from '@reduxjs/toolkit'
import typesReducer from "@/redux/slices/typesSlice";
import yearsReducer from "@/redux/slices/yearsSlice";
import highsReducer from "@/redux/slices/highsSlice";
import countiesReducer from "@/redux/slices/countiesSlice";
import schoolsReducer from "@/redux/slices/schoolsSlice";
import statesReducer from "@/redux/slices/statesSlice";
import headerReducer from "@/redux/slices/headerSlice";
import middleReducer from "@/redux/slices/middlesSlice";
import elementaryReducer from "@/redux/slices/elementarySlice";
import loadingReducer from "@/redux/slices/loadingSlice";
import msgReducer from "@/redux/slices/msgSlice";
import selectReducer from "@/redux/slices/selectSlice";
import educationYearReducer from "@/redux/slices/educationYearSlice";
import sideReducer from "@/redux/slices/sideSlice";
import topReducer from "@/redux/slices/topSlice";
import searchReducer from "@/redux/slices/searchSlice";
import showResultReducer from "@/redux/slices/showResultSlice";
import paginationReducer from "@/redux/slices/paginationSlice";

const store = configureStore({
    reducer: {
        types: typesReducer,
        years: yearsReducer,
        high: highsReducer,
        counties: countiesReducer,
        schools: schoolsReducer,
        states: statesReducer,
        header: headerReducer,
        middle: middleReducer,
        elementary: elementaryReducer,
        loading: loadingReducer,
        msg: msgReducer,
        select: selectReducer,
        educationYear: educationYearReducer,
        side: sideReducer,
        top: topReducer,
        search: searchReducer,
        pagination: paginationReducer,
        showResult: showResultReducer,
    },
})

export default store;
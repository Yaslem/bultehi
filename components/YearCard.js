import Styles from '@/styles/YearCard.module.css';
import Select from "@/components/Select";
import {useDispatch, useSelector} from "react-redux";
import {educationYearActions} from "@/redux/slices/educationYearSlice";
import axios from "axios";
import {yearsActions} from "@/redux/slices/yearsSlice";
import {selectActions} from "@/redux/slices/selectSlice";
import useSWR from "swr";
const fetcher = url => axios.get(url).then(res => res.data);
export default ({url}) => {
    const dispatch = useDispatch();
    const years = useSelector(state => state.years.years);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const isOpen = useSelector(state =>state.select.is.open);

    const { data, isError, isLoading } = useSWR(`/education-years`, fetcher);
    if(isLoading) return ;
    dispatch(yearsActions.get(data))
    return(
        <div className={Styles.year}>
            <ul>
                <li onClick={() => dispatch(educationYearActions.get(defaultYear))} className={year == defaultYear ? Styles.active  : undefined}>نتائج سنة {defaultYear}</li>
            </ul>
            <Select
                values={years.data}
                isOpen={isOpen}
                action={selectActions.setOpen}
                isYear={true}/>
        </div>
    )
}
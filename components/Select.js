import {useState} from "react";
import Styles from '@/styles/Select.module.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectActions} from "@/redux/slices/selectSlice";
import {educationYearActions} from "@/redux/slices/educationYearSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import {searchActions} from "@/redux/slices/searchSlice";
const fetcher = url => axios.get(url).then(res => res.data)
export default ({by, year, url, values, isOpen, action, searchAction, searchActionStatus, searchQuery, isYear = false}) => {
    const dispatch = useDispatch();

    const [active, setActive] = useState({
        value: '0',
        title: 'الكل',
        isYear: 'اختر سنة المسابقة'

    })
    function getSearch(id, value){
        if(id == 'all'){
            dispatch(searchActionStatus(false))
        }else {
            axios.get(`/${url}/year/${year}/${by}/${id}`).then(res => {
                dispatch(searchActionStatus(true))
                dispatch(searchAction(res.data))
                dispatch(searchQuery(value))
            })
        }
    }

    if(isYear){
        return(
            <div className={Styles.select}>
                <div className={isOpen == true ? Styles.active : undefined} onClick={e => {dispatch(action(!isOpen))}}>
                    <span>{active.isYear}</span>
                    <FontAwesomeIcon icon={faAngleUp} rotation={180} />
                </div>
                    {
                        isOpen == true &&
                        <ul>
                            {
                                values?.map(value => <li className={active.value === value.id && Styles.active} onClick={e => {
                                    setActive({value: value.id, isYear: `نتائج سنة ${value.name}`})
                                    dispatch(educationYearActions.get(value.name))
                                }}>نتائج سنة {value.name.trim()}</li>)
                            }
                        </ul>
                    }
            </div>
        )
    }

    return(
        <div className={Styles.select}>
            <div className={isOpen == true && Styles.active} onClick={e => {dispatch(action(!isOpen))}}>
                <span>{active.title}</span>
                <FontAwesomeIcon icon={faAngleUp} rotation={180} />
            </div>
            {
                isOpen == true &&
                <ul>
                    <li className={active.value == '0' && Styles.active} onClick={e => {
                        setActive({value: '0', title: 'الكل'})
                        getSearch('all', '')
                        dispatch(action(false))
                    }}>الكل</li>
                    {
                        values?.map(value => <li className={active.value === value.id && Styles.active} onClick={e => {
                            getSearch(value.id, value.name)
                            setActive({value: value.id, title: value.name})
                            dispatch(action(false))
                        }}>{value.name.trim()}</li>)
                    }
                </ul>
            }
        </div>
    )
}
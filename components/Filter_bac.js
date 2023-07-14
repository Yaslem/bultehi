import Filter from "@/styles/Filter.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faGraduationCap, faLocationArrow, faLocationDot,
    faLocationPin,
    faMagnifyingGlass,
    faSchool, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {loadingActions} from "@/redux/slices/loadingSlice";
import {msgActions} from "@/redux/slices/msgSlice";
import Select from "@/components/Select";
import {selectActions} from "@/redux/slices/selectSlice";
import useSWR from "swr";
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";
const fetcher = url => axios.get(url).then(res => res.data)

export default ({url, year, action, searchAction, searchActionStatus, searchQuery, states, counties, schools}) => {
    const dispatch = useDispatch();

    const isSchool = useSelector(state => state.select.is.schools);
    const isCounty = useSelector(state => state.select.is.counties);
    const isState = useSelector(state => state.select.is.states);

    const { data, isError, isLoading } = useSWR(`/${url}/year/${year}/filter`, fetcher);

    function getSearch(id, value){
        if(id.length == 0){
            dispatch(searchActionStatus(false))
        }else {
            axios.get(`/${url}/year/${year}/searchByNumberOrNameAr/${id}`).then(res => {
                dispatch(searchActionStatus(true))
                dispatch(searchAction(res.data))
                dispatch(searchQuery(value))
            })
        }
    }

    if(isLoading) return;

    dispatch(action.setStates(data.states))
    dispatch(action.setCounties(data.counties))
    dispatch(action.setSchools(data.schools))

    if(data.count == 0) return <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />

    return(
        <section className={Filter.filter}>
            <div>
                <label>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span>البحث بالرقم/الاسم</span>
                </label>
                <input
                    placeholder={'اكتب رقم الطالب أو اسمه'}
                    type={'text'}
                    onChange={e => getSearch(e.target.value, e.target.value)}
                />
            </div>
            <div>
                <label>
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>البحث بالمدرسة</span>
                </label>
                <Select
                    searchQuery={searchQuery}
                    searchActionStatus={searchActionStatus}
                    searchAction={searchAction}
                    year={year}
                    url={url}
                    by={'searchByShcool'}
                    values={schools}
                    isOpen={isSchool}
                    action={selectActions.setSchools}
                />
            </div>
            <div>
                <label>
                    <FontAwesomeIcon icon={faLocationArrow} />
                    <span>البحث بالمقاطعة</span>
                </label>
                <Select
                    searchQuery={searchQuery}
                    searchActionStatus={searchActionStatus}
                    searchAction={searchAction}
                    year={year}
                    url={url}
                    by={'searchByCounty'}
                    values={counties}
                    isOpen={isCounty}
                    action={selectActions.setCounties}
                />
            </div>
            <div>
                <label>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>البحث بالولاية</span>
                </label>
                <Select
                    searchQuery={searchQuery}
                    searchActionStatus={searchActionStatus}
                    searchAction={searchAction}
                    year={year}
                    url={url}
                    by={'searchByState'}
                    values={states}
                    isOpen={isState}
                    action={selectActions.setStates}
                />
            </div>
        </section>
    )
}
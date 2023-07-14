import HeaderPages from "@/components/HeaderPages";
import CateItems from "@/components/CateItems";
import {statesActions} from "@/redux/slices/statesSlice";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@/components/Alert";
import {headerActions} from "@/redux/slices/headerSlice";
import {loadingActions} from "@/redux/slices/loadingSlice";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import {NextSeo} from "next-seo";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const dispatch = useDispatch();
    const states = useSelector(state => state.states.states);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const pagination = useSelector(state => state.pagination.high.states.data);
    const isPagination = useSelector(state => state.pagination.high.states.isPagination);
    const prev = useSelector(state => state.pagination.high.states.prev);
    const next = useSelector(state => state.pagination.high.states.next);
    const currentPage = useSelector(state => state.pagination.high.states.currentPage);


    const { data, isError, isLoading } = useSWR(`/high/year/${year}/states`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'));
    dispatch(statesActions.get(data))

    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الثانوية ${year}`}
                openGraph={{
                    type: 'website',
                    url: '/high/states',
                    title: `بلتيهي - مسابقة ختم الدروس الثانوية ${year}`,
                    description: `عرض ترتيب الولايات في مسابقة ختم الدروس الثانوية المعروفة ببكالوريا لسنة ${year}`,
                }}
            />
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <HeaderPages title={'الولايات'} />
                {
                    year != defaultYear &&
                    <Alert
                        type={'warning'}
                        title={'تنبيه!'}
                        icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                        msg={`أنت الآن تعرض نتائج مسايقة ختم الدروس الثانوية لسنة ${year}`}  />
                }
                {
                    data.count == 0
                        ? <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
                        : isPagination == true
                            ? <CateItems
                                url={'/high/states'}
                                isLoading={isLoading}
                                isError={isError}
                                values={pagination}
                            />
                            : <CateItems
                                url={'/high/states'}
                                isLoading={isLoading}
                                isError={isError}
                                values={states}
                            />
                }
                {
                    data.next  != null
                        ? <Pagination
                            next={next}
                            prev={prev}
                            year={year}
                            url={`/high/year/${year}/states`}
                            paginationActionStatus={paginationActions.getStatesIsPaginationHigh}
                            paginationAction={paginationActions.getStatesHigh}
                            paginationActionsNext={paginationActions.getStatesNextHigh}
                            paginationActionsPrev={paginationActions.getStatesPrevHigh}
                            paginationActionsCurrentPage={paginationActions.getstatesCurrentPageHigh}
                            currentPage={currentPage}
                        />
                        : ''
                }
            </section>
        </>
    )
}
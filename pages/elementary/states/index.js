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
    const pagination = useSelector(state => state.pagination.elementary.states.data);
    const isPagination = useSelector(state => state.pagination.elementary.states.isPagination);
    const prev = useSelector(state => state.pagination.elementary.states.prev);
    const next = useSelector(state => state.pagination.elementary.states.next);
    const currentPage = useSelector(state => state.pagination.elementary.states.currentPage);
    const { data, isError, isLoading } = useSWR(`/elementary/year/${year}/states`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'));
    dispatch(statesActions.get(data))

    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`}
                openGraph={{
                    type: 'website',
                    url: 'elementary/states',
                    title: `بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`,
                    description: `عرض ترتيب الولايات في مسابقة ختم الدروس الابتدائية المعروفة بكنكور لسنة ${year}`,
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
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الابتدائية لسنة ${year}`}  />
                }
                {
                    data.count == 0
                        ? <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
                        : isPagination == true
                            ? <CateItems
                                url={'/elementary/states'}
                                isLoading={isLoading}
                                isError={isError}
                                values={pagination}
                                />
                            : <CateItems
                                url={'/elementary/states'}
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
                            url={`/elementary/year/${year}/states`}
                            paginationActionStatus={paginationActions.getStatesIsPaginationElementary}
                            paginationAction={paginationActions.getStatesElementary}
                            paginationActionsNext={paginationActions.getStatesNextElementary}
                            paginationActionsPrev={paginationActions.getStatesPrevElementary}
                            paginationActionsCurrentPage={paginationActions.getStatesCurrentPageElementary}
                            currentPage={currentPage}
                        />
                        : ''
                }
            </section>
        </>
    )
}
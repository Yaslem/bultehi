import HeaderPages from "@/components/HeaderPages";
import CateItems from "@/components/CateItems";
import {countiesActions} from "@/redux/slices/countiesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {headerActions} from "@/redux/slices/headerSlice";
import {loadingActions} from "@/redux/slices/loadingSlice";
import axios from "axios";
import {msgActions} from "@/redux/slices/msgSlice";
import Alert from "@/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import {NextSeo} from "next-seo";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const dispatch = useDispatch();
    const counties = useSelector(state => state.counties.counties);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const pagination = useSelector(state => state.pagination.elementary.counties.data);
    const isPagination = useSelector(state => state.pagination.elementary.counties.isPagination);
    const prev = useSelector(state => state.pagination.elementary.counties.prev);
    const next = useSelector(state => state.pagination.elementary.counties.next);
    const currentPage = useSelector(state => state.pagination.elementary.counties.currentPage);


    const { data, isError, isLoading } = useSWR(`/elementary/year/${year}/counties`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'))
    dispatch(countiesActions.get(data))
    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`}
                openGraph={{
                    type: 'website',
                    url: '/elementary/counties',
                    title: `بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`,
                    description: `عرض ترتيب المقاطعات في مسابقة ختم الدروس الابتدائية المعروفة بكنكور لسنة ${year}`,
                }}
            />
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <HeaderPages title={'المقاطعات'} />
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
                            ? <CateItems isCounty={true}
                                 url={'/elementary/counties'}
                                 isLoading={isLoading}
                                 isError={isError}
                                 values={pagination}
                            />
                            : <CateItems isCounty={true}
                                 url={'/elementary/counties'}
                                 isLoading={isLoading}
                                 isError={isError}
                                 values={counties}
                            />
                }
                {
                    data.next  != null
                        ? <Pagination
                            next={next}
                            prev={prev}
                            year={year}
                            url={`/elementary/year/${year}/counties`}
                            paginationActionStatus={paginationActions.getCountiesIsPaginationElementary}
                            paginationAction={paginationActions.getCountiesElementary}
                            paginationActionsNext={paginationActions.getCountiesNextElementary}
                            paginationActionsPrev={paginationActions.getCountiesPrevElementary}
                            paginationActionsCurrentPage={paginationActions.getCountiesCurrentPageElementary}
                            currentPage={currentPage}
                        />
                        : ''
                }
            </section>
        </>
    )
}
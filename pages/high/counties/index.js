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
    const pagination = useSelector(state => state.pagination.high.counties.data);
    const isPagination = useSelector(state => state.pagination.high.counties.isPagination);
    const prev = useSelector(state => state.pagination.high.counties.prev);
    const next = useSelector(state => state.pagination.high.counties.next);
    const currentPage = useSelector(state => state.pagination.high.counties.currentPage);


    const { data, isError, isLoading } = useSWR(`/high/year/${year}/counties`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الثاتوية'))
    dispatch(countiesActions.get(data))
    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الثانوية ${year}`}
                openGraph={{
                    type: 'website',
                    url: '/high/counties',
                    title: `بلتيهي - مسابقة ختم الدروس الثانوية ${year}`,
                    description: `عرض ترتيب المقاطعات في مسابقة ختم الدروس الثانوية المعروفة ببكالوريا لسنة ${year}`,
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
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الثانوية لسنة ${year}`}  />
                }
                {
                    data.count == 0
                        ? <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
                        : isPagination == true
                            ? <CateItems isCounty={true}
                                 url={'/high/schools'}
                                 isLoading={isLoading}
                                 isError={isError}
                                 values={pagination}
                                />
                            : <CateItems isCounty={true}
                                 url={'/high/schools'}
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
                            url={`/high/year/${year}/counties`}
                            paginationActionStatus={paginationActions.getCountiesIsPaginationHigh}
                            paginationAction={paginationActions.getCountiesHigh}
                            paginationActionsNext={paginationActions.getCountiesNextHigh}
                            paginationActionsPrev={paginationActions.getCountiesPrevHigh}
                            paginationActionsCurrentPage={paginationActions.getCountiesCurrentPageHigh}
                            currentPage={currentPage}
                        />
                        : ''
                }
            </section>
        </>
    )
}
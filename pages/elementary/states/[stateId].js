import HeaderPages from "@/components/HeaderPages";
import Alert from "@/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import CateItems from "@/components/CateItems";
import {countiesActions} from "@/redux/slices/countiesSlice";
import {useDispatch, useSelector} from "react-redux";
import {headerActions} from "@/redux/slices/headerSlice";
import useSWR from "swr";
import axios from "axios";
import {statesActions} from "@/redux/slices/statesSlice";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import {NextSeo} from "next-seo";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const showCounties = useSelector(state => state.states.howCounties);
    const infoState = useSelector(state => state.states.infoState);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const pagination = useSelector(state => state.pagination.elementary.schools.data);
    const isPagination = useSelector(state => state.pagination.elementary.schools.isPagination);
    const prev = useSelector(state => state.pagination.elementary.schools.prev);
    const next = useSelector(state => state.pagination.elementary.schools.next);
    const currentPage = useSelector(state => state.pagination.elementary.schools.currentPage);


    const { data, isError, isLoading } = useSWR(`/elementary/year/${year}/states/${router.query.id}`, fetcher);
    if(isLoading) return  <Loading />
    if(isError) return  <Alert
        type={'error'}
        title={'لا توجد بينات!'}
        icon={<FontAwesomeIcon icon={faXmark} />}
        msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
    if(data.count == 0) return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية - لا توجد بيانات!`}
            />
            <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
        </>
    )
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'));
    dispatch(statesActions.show(data))
    dispatch(statesActions.info(data.state))
    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية ${year} - المدراس التابعة لولاية ${infoState[0]?.name}`}
                openGraph={{
                    type: 'website',
                    url: `/elementary/states/${router.query.id}`,
                    title: 'مسابقة ختم الدروس الثانوية',
                    description: `ترتيب المدراس التابعة لولاية ${infoState[0]?.name} في مسابقة ختم الدروس الابتدائية المعروفة بكنكور لسنة ${year}`,
                }}
            />
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <HeaderPages title={`المدارس التابعة لولاية ${infoState[0]?.name}`} />
                {
                    year != defaultYear &&
                    <Alert
                        type={'warning'}
                        title={'تنبيه!'}
                        icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الابتدائية لسنة ${year}`}  />
                }
                {
                    isPagination == true
                        ? <CateItems
                            url={'/elementary/schools'}
                            isLoading={isLoading}
                            isError={isError}
                            values={pagination}/>
                        : <CateItems
                            url={'/elementary/schools'}
                            isLoading={isLoading}
                            isError={isError}
                            values={showCounties}/>
                }
                {
                    data.next  != null
                        ? <Pagination
                            next={next}
                            prev={prev}
                            year={year}
                            url={`/elementary/year/${year}/states/${router.query.id}`}
                            paginationActionStatus={paginationActions.getSchoolsIsPaginationElementary}
                            paginationAction={paginationActions.getSchoolsElementary}
                            paginationActionsNext={paginationActions.getSchoolsNextElementary}
                            paginationActionsPrev={paginationActions.getSchoolsPrevElementary}
                            paginationActionsCurrentPage={paginationActions.getSchoolsCurrentPageElementary}
                            currentPage={currentPage}
                        />
                        : ''
                }
            </section>
        </>
    )
}
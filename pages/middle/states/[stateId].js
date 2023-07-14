import HeaderPages from "@/components/HeaderPages";
import Alert from "@/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import CateItems from "@/components/CateItems";
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
    const pagination = useSelector(state => state.pagination.middle.schools.data);
    const isPagination = useSelector(state => state.pagination.middle.schools.isPagination);
    const prev = useSelector(state => state.pagination.middle.schools.prev);
    const next = useSelector(state => state.pagination.middle.schools.next);
    const currentPage = useSelector(state => state.pagination.middle.schools.currentPage);


    const { data, isError, isLoading } = useSWR(`/middle/year/${year}/states/${router.query.id}`, fetcher);
    dispatch(statesActions.show(data))
    if(isLoading) return  <Loading />
    if(isError) return  <Alert
        type={'error'}
        title={'لا توجد بينات!'}
        icon={<FontAwesomeIcon icon={faXmark} />}
        msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
    if(data.count == 0) return (
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الإعدادية - لا توجد بيانات!`}
            />
            <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
        </>
    )
    dispatch(headerActions.get('مسابقة ختم الدروس الإعدادية'))

    dispatch(statesActions.info(data.state))
    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الإعدادية - المدراس التابعة لولاية ${infoState[0]?.name}`}
                openGraph={{
                    type: 'website',
                    url: `/middle/states/${router.query.id}`,
                    title: 'مسابقة ختم الدروس الإعدادية',
                    description: `ترتيب المدراس التابعة لولاية ${infoState[0]?.name} في مسابقة ختم الدروس الإعدادية المعروفة بابريفه لسنة ${year}`,
                }}
            />
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <HeaderPages title={`المدراس التابعة لولاية ${infoState[0]?.name}`} />
                {
                    year != defaultYear &&
                    <Alert
                        type={'warning'}
                        title={'تنبيه!'}
                        icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الإعدادية لسنة ${year}`}  />
                }
                {
                    isPagination == true
                        ? <CateItems
                            url={'/middle/schools'}
                            isLoading={isLoading}
                            isError={isError}
                            values={pagination}/>
                        : <CateItems
                            url={'/middle/schools'}
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
                            url={`/middle/year/${year}/states/${router.query.id}`}
                            paginationActionStatus={paginationActions.getSchoolsIsPaginationMiddle}
                            paginationAction={paginationActions.getSchoolsMiddle}
                            paginationActionsNext={paginationActions.getSchoolsNextMiddle}
                            paginationActionsPrev={paginationActions.getSchoolsPrevMiddle}
                            paginationActionsCurrentPage={paginationActions.getSchoolsCurrentPageMiddle}
                            currentPage={currentPage}
                        />
                        : ''
                }
            </section>
        </>
    )
}
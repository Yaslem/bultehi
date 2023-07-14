import HeaderPages from "@/components/HeaderPages";
import CateItems from "@/components/CateItems";
import {schoolsActions} from "@/redux/slices/schoolsSlice";
import {useDispatch, useSelector} from "react-redux";
import {faCircleExclamation, faCircleInfo, faXmark} from "@fortawesome/free-solid-svg-icons";
import {headerActions} from "@/redux/slices/headerSlice";
import Alert from "@/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import axios from "axios";
import {NextSeo} from "next-seo";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const dispatch = useDispatch();
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const schools = useSelector(state => state.schools.schools);
    const pagination = useSelector(state => state.pagination.elementary.schools.data);
    const isPagination = useSelector(state => state.pagination.elementary.schools.isPagination);
    const prev = useSelector(state => state.pagination.elementary.schools.prev);
    const next = useSelector(state => state.pagination.elementary.schools.next);
    const currentPage = useSelector(state => state.pagination.elementary.schools.currentPage);


    const { data, isError, isLoading } = useSWR(`/elementary/year/${year}/schools`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'))
    dispatch(schoolsActions.get(data));

    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`}
                openGraph={{
                    type: 'website',
                    url: '/elementary/schools',
                    title: `بلتيهي - مسابقة ختم الدروس الثانوية ${year}`,
                    description: `عرض ترتيب المدراس في مسابقة ختم الدروس الابتدائية المعروفة بكنكور لسنة ${year}`,
                }}
            />
            <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <HeaderPages title={'المدارس'} />
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
                                url={'/elementary/schools'}
                                isLoading={isLoading}
                                isError={isError}
                                values={pagination}
                            />
                        : <CateItems
                                url={'/elementary/schools'}
                                isLoading={isLoading}
                                isError={isError}
                                values={schools}
                            />
                }
                {
                    data.next  != null
                        ? <Pagination
                            next={next}
                            prev={prev}
                            year={year}
                            url={`/elementary/year/${year}/schools`}
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
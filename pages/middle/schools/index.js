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
    const pagination = useSelector(state => state.pagination.middle.schools.data);
    const isPagination = useSelector(state => state.pagination.middle.schools.isPagination);
    const prev = useSelector(state => state.pagination.middle.schools.prev);
    const next = useSelector(state => state.pagination.middle.schools.next);
    const currentPage = useSelector(state => state.pagination.middle.schools.currentPage);


    const { data, isError, isLoading } = useSWR(`/middle/year/${year}/schools`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الإعدادية'))
    dispatch(schoolsActions.get(data));

    return(
        <>
            <NextSeo
                title="بلتيهي - مسابقة ختم الدروس الإعدادية - المدارس"
                openGraph={{
                    type: 'website',
                    url: '/middle/schools',
                    title: 'مسابقة ختم الدروس الإعدادية',
                    description: `ترتيب المدارس في مسابقة ختم الدروس الإعدادية المعروفة بابريفه لسنة ${year}`,
                }}
            />
            <section style={{display: 'flex',flexDirection: 'column',gap: '20px'}}>
                <HeaderPages title={'المدارس'} />
                {
                    year != defaultYear &&
                    <Alert
                        type={'warning'}
                        title={'تنبيه!'}
                        icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الإعدادية لسنة ${year}`}  />
                }
                {
                    data.count == 0
                        ? <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
                        : isPagination == true
                            ? <CateItems
                                url={'/middle/schools'}
                                isLoading={isLoading}
                                isError={isError}
                                values={pagination}
                                />
                            : <CateItems
                                url={'/middle/schools'}
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
                            url={`/middle/year/${year}/schools`}
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
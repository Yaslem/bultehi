import HeaderPages from "@/components/HeaderPages";
import Filter_bac from "@/components/Filter_bac";
import Styles from '@/styles/dash/bac/index.module.css'
import Table from "@/components/Table";
import Categories from "@/components/Categories";
import {useDispatch, useSelector} from "react-redux";
import YearCard from "@/components/YearCard";
import Alert from "@/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import {headerActions} from "@/redux/slices/headerSlice";
import useSWR from "swr";
import axios from "axios";
import {highsActions} from "@/redux/slices/highsSlice";
import Msg from "@/components/Msg";
import {middleActions} from "@/redux/slices/middlesSlice";
import {useEffect} from "react";
import {NextSeo} from "next-seo";
import {searchActions} from "@/redux/slices/searchSlice";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.search.middle.search);
    const query = useSelector(state => state.search.middle.query);
    const isSearch = useSelector(state => state.search.middle.isSearch);
    const middle = useSelector(state => state.middle.middle);
    const schools = useSelector(state => state.middle.schools);
    const counties = useSelector(state => state.middle.counties);
    const states = useSelector(state => state.middle.states);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const pagination = useSelector(state => state.pagination.middle.data);
    const isPagination = useSelector(state => state.pagination.middle.isPagination);
    const prev = useSelector(state => state.pagination.middle.prev);
    const next = useSelector(state => state.pagination.middle.next);
    const currentPage = useSelector(state => state.pagination.middle.currentPage);


    const { data, status, isError, isLoading } = useSWR(`/middle/year/${year}`, fetcher)
    if (isLoading) return;
    dispatch(middleActions.get(data));
    dispatch(headerActions.get('مسابقة ختم الدروس الإعدادية'));

    return(
        <>
            <NextSeo
                title="بلتيهي - مسابقة ختم الدروس الإعدادية"
                openGraph={{
                    type: 'website',
                    url: '/middle',
                    title: 'مسابقة ختم الدروس الإعدادية',
                    description: `من هذه الصفحة يمكنك عرض نتائج مسابقة ختم الدروس الإعدادية المعروفة بابريفه لسنة ${year}`,
                }}
            />
            <section className={Styles.index}>
                <HeaderPages title={`ابريفه - ${year}`} isBack={false} />
                <div className={Styles.year}>
                    <YearCard />
                    <Categories
                        routeCounties={'/counties'}
                        routeSchools={'/schools'}
                        routeStates={'/states'}
                    />
                </div>
                {
                    year != defaultYear &&
                    <Alert
                        type={'warning'}
                        title={'تنبيه!'}
                        icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الإعدادية لسنة ${year}`}  />
                }
                {
                    isSearch == true && query.length > 0 &&
                    <Alert
                        type={'warning'}
                        title={'تنبيه!'}
                        icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                        msg={`أنت الآن تعرض نتائج مفلترة بواسطة ${query}`}  />
                }
                {
                    data.count == 0
                        ? <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
                        : <>
                            <Filter_bac
                                searchQuery={searchActions.queryMiddle}
                                searchActionStatus={searchActions.isSearchMiddle}
                                searchAction={searchActions.getMiddle}
                                url={'middle'}
                                year={year}
                                schools={schools}
                                counties={counties}
                                states={states}
                                action={middleActions}
                            />
                            {
                                isSearch == true
                                    ? <Table isLoading={isLoading} isError={isError} values={search}/>
                                    : <>
                                        {
                                            isPagination == true
                                                ? <Table isLoading={isLoading} isError={isError} values={pagination}/>
                                                : <Table isLoading={isLoading} isError={isError} values={middle}/>
                                        }
                                        {
                                            data.next  != null
                                                ? <Pagination
                                                    next={next}
                                                    prev={prev}
                                                    year={year}
                                                    url={`/middle/year/${year}`}
                                                    paginationActionStatus={paginationActions.isPaginationMiddle}
                                                    paginationAction={paginationActions.getMiddle}
                                                    paginationActionsNext={paginationActions.getNextMiddle}
                                                    paginationActionsPrev={paginationActions.getPrevMiddle}
                                                    currentPage={currentPage}
                                                    paginationActionsCurrentPage={paginationActions.getCurrentPageMiddle}
                                                />
                                                : ''
                                        }
                                    </>
                            }
                        </>
                }
            </section>
        </>
    )
}
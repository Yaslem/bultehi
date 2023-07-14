import HeaderPages from "@/components/HeaderPages";
import Filter_bac from "@/components/Filter_bac";
import Styles from '@/styles/dash/bac/index.module.css'
import Table from "@/components/Table";
import Categories from "@/components/Categories";
import {useDispatch, useSelector} from "react-redux";
import YearCard from "@/components/YearCard";
import {elementaryActions} from "@/redux/slices/elementarySlice";
import Alert from "@/components/Alert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import {headerActions} from "@/redux/slices/headerSlice";
import useSWR from "swr";
import axios from "axios";
import {NextSeo} from "next-seo";
import {searchActions} from "@/redux/slices/searchSlice";
import {useRouter} from "next/router";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
import {useState} from "react";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const dispatch = useDispatch();
    const elementary = useSelector(state => state.elementary.elementary);
    const search = useSelector(state => state.search.elementary.search);
    const query = useSelector(state => state.search.elementary.query);
    const isSearch = useSelector(state => state.search.elementary.isSearch);
    const schools = useSelector(state => state.elementary.schools);
    const counties = useSelector(state => state.elementary.counties);
    const states = useSelector(state => state.elementary.states);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const pagination = useSelector(state => state.pagination.elementary.data);
    const isPagination = useSelector(state => state.pagination.elementary.isPagination);
    const prev = useSelector(state => state.pagination.elementary.prev);
    const next = useSelector(state => state.pagination.elementary.next);
    const currentPage = useSelector(state => state.pagination.elementary.currentPage);
    const { data, isError, isLoading } = useSWR(`/elementary/year/${year}`, fetcher);
    if(isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'));
    dispatch(elementaryActions.get(data))

    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`}
                openGraph={{
                    type: 'website',
                    url: '/elementary',
                    title: `بلتيهي - مسابقة ختم الدروس الابتدائية ${year}`,
                    description: `عرض نتائج مسابقة ختم الدروس الابتدائية المعروفة بكنكور لسنة ${year}`,
                }}
            />
            <section className={Styles.index}>
                <HeaderPages title={`كنكور - ${year}`} isBack={false} />
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
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الابتدائية لسنة ${year}`}  />
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
                                searchQuery={searchActions.queryElementary}
                                searchActionStatus={searchActions.isSearchElementary}
                                searchAction={searchActions.getElementary}
                                url={'elementary'}
                                year={year}
                                schools={schools}
                                counties={counties}
                                states={states}
                                action={elementaryActions}
                            />
                            {
                                isSearch == true
                                    ? <Table isLoading={isLoading} isError={isError} values={search}/>
                                    : <>
                                        {
                                            isPagination == true
                                                ? <Table isLoading={isLoading} isError={isError} values={pagination}/>
                                                : <Table isLoading={isLoading} isError={isError} values={elementary}/>
                                        }
                                        {
                                            data.next  != null
                                                ? <Pagination
                                                    next={next}
                                                    prev={prev}
                                                    year={year}
                                                    url={`/elementary/year/${year}`}
                                                    paginationActionStatus={paginationActions.isPaginationElementary}
                                                    paginationAction={paginationActions.getElementary}
                                                    paginationActionsNext={paginationActions.getNextElementary}
                                                    paginationActionsPrev={paginationActions.getPrevElementary}
                                                    currentPage={currentPage}
                                                    paginationActionsCurrentPage={paginationActions.getCurrentPageElementary}
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
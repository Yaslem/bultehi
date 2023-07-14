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
import {highsActions} from "@/redux/slices/highsSlice";
import { NextSeo } from 'next-seo';
import Msg from "@/components/Msg";
import {useRouter} from "next/router";
import {searchActions} from "@/redux/slices/searchSlice";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const high = useSelector(state => state.high.high);
    const search = useSelector(state => state.search.high.search);
    const query = useSelector(state => state.search.high.query);
    const isSearch = useSelector(state => state.search.high.isSearch);
    const pagination = useSelector(state => state.pagination.high.data);
    const isPagination = useSelector(state => state.pagination.high.isPagination);
    const prev = useSelector(state => state.pagination.high.prev);
    const next = useSelector(state => state.pagination.high.next);
    const currentPage = useSelector(state => state.pagination.high.currentPage);
    const schools = useSelector(state => state.high.schools);
    const counties = useSelector(state => state.high.counties);
    const states = useSelector(state => state.high.states);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);

    const { data, isError, isLoading } = useSWR(`/high/year/${year}`, fetcher)
    if (isLoading) return;
    dispatch(headerActions.get('مسابقة ختم الدروس الثانوية'))
    dispatch(highsActions.get(data))
    return(
        <>
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الثانوية ${year}`}
                openGraph={{
                    type: 'website',
                    url: '/high',
                    title: `بلتيهي - مسابقة ختم الدروس الثانوية ${year}`,
                    description: `عرض نتائج مسابقة ختم الدروس الثانوية المعروفة ببكالوريا لسنة ${year}`,
                }}
            />
            <section className={Styles.index}>
                <HeaderPages title={`بكالوريا - ${year}`} isBack={false} />
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
                        msg={`أنت الآن تعرض نتائج مسابقة ختم الدروس الثانوية لسنة ${year}`}  />
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
                                searchQuery={searchActions.queryHigh}
                                searchActionStatus={searchActions.isSearchHigh}
                                searchAction={searchActions.getHigh}
                                url={'high'}
                                year={year}
                                schools={schools}
                                counties={counties}
                                states={states}
                                action={highsActions}
                            />
                            {
                                isSearch == true
                                    ? <Table isLoading={isLoading} isError={isError} values={search}/>
                                    : <>
                                        {
                                            isPagination == true
                                                ? <Table isLoading={isLoading} isError={isError} values={pagination}/>
                                                : <Table isLoading={isLoading} isError={isError} values={high}/>
                                        }
                                        {
                                            data.next  != null
                                                ? <Pagination
                                                    next={next}
                                                    prev={prev}
                                                    year={year}
                                                    url={`/high/year/${year}`}
                                                    paginationActionStatus={paginationActions.isPaginationHigh}
                                                    paginationAction={paginationActions.getHigh}
                                                    paginationActionsNext={paginationActions.getNextHigh}
                                                    paginationActionsPrev={paginationActions.getPrevHigh}
                                                    currentPage={currentPage}
                                                    paginationActionsCurrentPage={paginationActions.getCurrentPageHigh}
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
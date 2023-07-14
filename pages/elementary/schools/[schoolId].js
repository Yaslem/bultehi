import Table from "@/components/Table";
import {useDispatch, useSelector} from "react-redux";
import {headerActions} from "@/redux/slices/headerSlice";
import axios from "axios";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faE,
    faGraduationCap,
    faH,
    faM,
    faSchool,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import Styles from '@/styles/Profile.module.css';
import Alert from "@/components/Alert";
import HeaderPages from "@/components/HeaderPages";
import useSWR from "swr";
import {elementaryActions} from "@/redux/slices/elementarySlice";
import {schoolsActions} from "@/redux/slices/schoolsSlice";
import useDeviceSize from "@/components/useDeviceSize";
import {NextSeo} from "next-seo";
import {useEffect, useState} from "react";
import Pagination from "@/components/Pagination";
import {paginationActions} from "@/redux/slices/paginationSlice";
const fetcher = url => axios.get(url).then(res => res.data);
export default () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const elementary = useSelector(state => state.elementary.showStudents);
    const profile = useSelector(state => state.schools.profile);
    const year = useSelector(state => state.educationYear.year);
    const defaultYear = useSelector(state => state.educationYear.default);
    const pagination = useSelector(state => state.pagination.elementary.data);
    const isPagination = useSelector(state => state.pagination.elementary.isPagination);
    const prev = useSelector(state => state.pagination.elementary.prev);
    const next = useSelector(state => state.pagination.elementary.next);
    const currentPage = useSelector(state => state.pagination.elementary.currentPage);

    const [open, setOpen] = useState(false);
    const [width, height] = useDeviceSize();

    useEffect(() => {
        width > 1100 && setOpen(false)
    }, [width])

    const { data, isError, isLoading } = useSWR(`/elementary/year/${year}/schools/${router.query.id}`, fetcher)

    if(isLoading) return <Loading />
    if(isError) return <Alert
        type={'error'}
        title={'لا توجد بينات!'}
        icon={<FontAwesomeIcon icon={faXmark} />}
        msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
    if(data.count == 0) return (
        <>
            <Alert type={'error'} title={'لا توجد بينات!'} icon={<FontAwesomeIcon icon={faXmark} />} msg={'عفوا، لم نتمكن من العثور على بينات.'}  />
            <NextSeo
                title={`بلتيهي - مسابقة ختم الدروس الابتدائية - لا توجد بيانات!`}
            />
        </>
    )
    dispatch(headerActions.get('مسابقة ختم الدروس الابتدائية'));
    dispatch(elementaryActions.setShowStudents(data))
    dispatch(schoolsActions.setProfile(data.school))
    return(
        <section className={Styles.index}>
            <HeaderPages title={'الصفحة الشخصية للمدرسة'} />
            {
                profile.map((school, key) =>
                    <>
                        <NextSeo
                            title={`بلتيهي - مسابقة ختم الدروس الابتدائية ${year} - المدرسة ${school.name}`}
                            openGraph={{
                                title:`بلتيهي - مسابقة ختم الدروس الابتدائية ${year} - المدرسة ${school.name}`,
                                description: `معلومات المدرسة ${school.name} في مسابقة ختم الدروس الابتدائية المعروفة بكنكور لسنة ${year}`,
                                url: `/elementary/schools/${router.query.id}`,
                                type: 'profile',
                                profile: {
                                    firstName: `${school.name}`,
                                },
                            }}
                        />
                        <section className={Styles.index}>
                            <section className={Styles.profile}>
                                <Image src={'/img/background.png'} alt={'back'} width={100} unoptimized height={100}/>
                                <div>
                                    <div>
                                        <Image src={'/img/avatar.png'} alt={'school'} unoptimized width={100} height={100}/>
                                        <div>
                                            <h5>{school.name}</h5>
                                            <span>السنة: {school.year}، الناجحون: {school.count_students_is_true}</span>
                                        </div>
                                    </div>
                                    <span>{school.type}</span>
                                </div>
                                {
                                    width <= 1100 &&
                                    <div>
                                        <ul>
                                            <li>
                                                <FontAwesomeIcon icon={faSchool} />
                                                <span onClick={() => setOpen(true)}>معلومات المدرسة</span>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </section>
                            <section className={Styles.wrapper}>
                                <div className={open == true && Styles.open} style={{
                                    display: open == true && 'block',

                                }}>
                                    <div>
                                        {
                                            open == true
                                                ? <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(false)}/>
                                                : <FontAwesomeIcon icon={faCircleExclamation}/>
                                        }
                                        <h5>معلومات المدرسة</h5>
                                    </div>
                                    <ul>
                                        <li>
                                            <span>اسم المدرسة</span>
                                            <span>{school.name}</span>
                                        </li>
                                        <li>
                                            <span>عدد المترشحين</span>
                                            <span>{school.count_students}</span>
                                        </li>
                                        <li>
                                            <span>عدد الناجحين</span>
                                            <span>{school.count_students_is_true}</span>
                                        </li>
                                        <li>
                                            <span>عدد الراسبين</span>
                                            <span>{school.count_students_is_false}</span>
                                        </li>
                                        <li>
                                            <span>الرتبة وطنيا</span>
                                            <span>{school.ranking_nationally}</span>
                                        </li>
                                        <li>
                                            <span>الرتبة في الولاية</span>
                                            <span>{school.ranking_in_state}</span>
                                        </li>
                                        <li>
                                            <span>الرتبة في البلدية</span>
                                            <span>{school.ranking_in_municipality}</span>
                                        </li>
                                        <li>
                                            <span>الولاية</span>
                                            <span>{school.state}</span>
                                        </li>
                                        <li>
                                            <span>البلدية</span>
                                            <span>{school.county}</span>
                                        </li>
                                        <li>
                                            <span>المدير</span>
                                            <span>{school.manager}</span>
                                        </li>
                                        <li>
                                            <span>رقم التواصل</span>
                                            <span>{school.contact_number}</span>
                                        </li>
                                        <li>
                                            <span>الموقع</span>
                                            <span>{school.location}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
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
                                            ? <Table
                                                action={elementaryActions}
                                                isLoading={isLoading}
                                                isError={isError}
                                                values={pagination}/>
                                            : <Table
                                                action={elementaryActions}
                                                isLoading={isLoading}
                                                isError={isError}
                                                values={elementary}/>
                                    }
                                    {
                                        data.next  != null
                                            ? <Pagination
                                                next={next}
                                                prev={prev}
                                                year={year}
                                                url={`/elementary/year/${year}/schools/${router.query.id}`}
                                                paginationActionStatus={paginationActions.isPaginationElementary}
                                                paginationAction={paginationActions.getElementary}
                                                paginationActionsNext={paginationActions.getNextElementary}
                                                paginationActionsPrev={paginationActions.getPrevElementary}
                                                paginationActionsCurrentPage={paginationActions.getCurrentPageElementary}
                                                currentPage={currentPage}
                                            />
                                            : ''
                                    }
                                </div>
                            </section>
                        </section>
                    </>
                )
            }
        </section>
    )
}
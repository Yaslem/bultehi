import Styles from "@/styles/Categories.module.css";
import Loading from "@/components/Loading";
import Link from "next/link";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Alert from "@/components/Alert";
import {sideActions} from "@/redux/slices/sideSlice";
import {useDispatch} from "react-redux";
export default ({url, isLoading, isError, values, isCounty = false}) => {
    const dispatch = useDispatch();
    if(isLoading) return  <Loading />
    if(isError) return  <Alert
        type={'error'}
        title={'لا توجد بينات!'}
        icon={<FontAwesomeIcon icon={faXmark} />}
        msg={'عفوا، لم نتمكن من العثور على بينات.'}  />

    return(
        <section className={Styles.items}>
            {
                values.data?.map((value, key) =>

                    <div style={{
                        paddingBottom: isCounty == true && '8px'
                    }} key={key} onClick={() => dispatch(sideActions.isOpen(true))}>
                        <div>
                            <ul>
                                <li>
                                    <span>الاسم</span>
                                    <p>{value.name.trim()}</p>
                                </li>
                                <li>
                                    <span>الناجحون</span>
                                    <p>{value.count_students_is_true}</p>
                                </li>
                                <li>
                                    <span>الترتيب</span>
                                    <p>#{key + 1}</p>
                                </li>
                            </ul>
                        </div>
                        {
                            isCounty == false &&
                            <Link href={{
                                pathname: url + `/${value.name.trim().replace(' ', '-')}`,
                                query: { id: value.id },
                            }}>عرض</Link>
                        }
                    </div>
                )
            }
        </section>
    )
}
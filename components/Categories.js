import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faSchool, faSchoolFlag} from "@fortawesome/free-solid-svg-icons";
import Styles from '@/styles/Categories.module.css'
import {useRouter} from "next/router";
import {sideActions} from "@/redux/slices/sideSlice";
import {useDispatch} from "react-redux";

export default ({routeStates, routeCounties, routeSchools}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    return(
        <section className={Styles.category}>
            <div onClick={e => {
                router.push(router.pathname + routeSchools)
                dispatch(sideActions.isOpen(true))
            }}>
                <FontAwesomeIcon icon={faSchool} />
                <span>المدارس</span>
            </div>
            <div onClick={e => {
                router.push(router.pathname + routeStates)
                dispatch(sideActions.isOpen(true))
            }}>
                <FontAwesomeIcon icon={faFlag} />
                <span>الولايات</span>
            </div>
            <div onClick={e => {
                router.push(router.pathname + routeCounties)
                dispatch(sideActions.isOpen(true))
            }}>
                <FontAwesomeIcon icon={faSchoolFlag} />
                <span>المقاطعات</span>
            </div>
        </section>
    )
}
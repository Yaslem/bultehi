import Link from "next/link";
import Image from "next/image";
import Styles from "@/styles/SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faBars,
    faE, faGear,
    faH, faHouse,
    faM, faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {sideActions} from "@/redux/slices/sideSlice";
import useDeviceSize from "@/components/useDeviceSize";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const isActive = useSelector(state => state.side.isActive);
    const isHide = useSelector(state => state.side.isHide);
    const isOpen = useSelector(state => state.side.isOpen);
    const [width, height] = useDeviceSize();


    function getActive(pathname){
        if(router.pathname.split('/').includes(pathname)){
            return Styles.true
        }else {
            return '';
        }
    }

    function getIsHide(){
        if(width <= 800){
            return <FontAwesomeIcon icon={faBars} onClick={() => dispatch(sideActions.isOpen(!isOpen))} />
        }else {
            dispatch(sideActions.isOpen(false));
            return '';
        }
    }

    function getStyle(){
        if(isOpen) {
            return `${Styles.aside} ${Styles.hide}`;
        }else {
            return `${Styles.aside}`;
        }
    }

    return (
        <aside className={getStyle()}>
            <section>
                <div>
                    <img src={'/img/logon.png'} alt={'logo'}/>
                    {
                        getIsHide()
                    }
                </div>
                <div>
                    <ul>
                        <Link href={'/'} onClick={() => dispatch(sideActions.isOpen(true))}>
                            <li className={router.pathname == '/' && Styles.true}>
                                <span>
                                    <FontAwesomeIcon icon={faHouse} />
                                </span>
                                <span>الرئيسية</span>
                            </li>
                        </Link>
                        <Link href={'/high'} onClick={() => dispatch(sideActions.isOpen(true))}>
                            <li className={getActive('high')}>
                                <span>
                                    <FontAwesomeIcon icon={faH} />
                                </span>
                                <span>بكالوريا</span>
                            </li>
                        </Link>
                        <Link href={'/middle'}>
                            <li className={getActive('middle')}>
                                <span>
                                    <FontAwesomeIcon icon={faM} />
                                </span>
                                <span>ابريفه</span>
                            </li>
                        </Link>
                        <Link href={'/elementary'}>
                            <li className={getActive('elementary')}>
                                <span>
                                    <FontAwesomeIcon icon={faE} />
                                </span>
                                <span>كنكور</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </section>
        </aside>
    )
}
import Image from "next/image";
import Styles from '@/styles/Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {sideActions} from "@/redux/slices/sideSlice";
import {useEffect, useState} from "react";
import useDeviceSize from "@/components/useDeviceSize";

export default () => {
    const dispatch = useDispatch();
    const header = useSelector(state => state.header.title);
    const isHide = useSelector(state => state.side.isHide);
    const isOpen = useSelector(state => state.side.isOpen);

    const [width, height] = useDeviceSize();
    function getIsHide(){
        if(width <= 800){
            dispatch(sideActions.isHide(true))
            return <FontAwesomeIcon icon={faBars} onClick={() => dispatch(sideActions.isOpen(!isOpen))} />
        }else {
            dispatch(sideActions.isHide(false));
            return '';
        }
    }
    return(
        <>

            <header className={Styles.header}>
                <div>
                    {
                        getIsHide()
                    }
                    <h3>{header}</h3>
                </div>
            </header>
        </>
    );
}
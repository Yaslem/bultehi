import Styles from '@/styles/Table.module.css';
import {faCheck, faCircleExclamation, faEye, faFaceDizzy, faInfo, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import Loading from "@/components/Loading";
import Msg from "@/components/Msg";
import {useState} from "react";
import Alert from "@/components/Alert";
import Show from "@/components/Show";
import {showResultActions} from "@/redux/slices/showResultSlice";
import {log} from "next/dist/server/typescript/utils";
import {sideActions} from "@/redux/slices/sideSlice";
export default ({isError, isLoading, values}) => {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState('');
    const [isEnglish, setIsEnglish] = useState('');
    const isOpen = useSelector(state => state.showResult.isOpen);

    if(isLoading) return <Loading />
    if(isError) return <Alert
        type={'error'}
        title={'لا توجد بينات!'}
        icon={<FontAwesomeIcon icon={faXmark} />}
        msg={'عفوا، لم نتمكن من العثور على بينات.'}  />

    function getIcon(decision){
        switch (decision){
            case 'راسب':
                return <FontAwesomeIcon className={Styles.false} icon={faXmark} />;
                break;
            case 'ناجح':
                return <FontAwesomeIcon className={Styles.true} icon={faCheck} />;
                break;
            case 'الدورة التكميلية':
                return <FontAwesomeIcon className={Styles.between} icon={faInfo} />;
                break;
            default:
                return <FontAwesomeIcon className={Styles.false2} icon={faFaceDizzy} />;
        }
    }


    return(
        <>
            <div className={Styles.table}>
                {
                    values.data?.map((student, key) =>
                        <div key={key} onMouseEnter={e => setIsHover(student.id)} onMouseLeave={e => setIsHover(false)}>
                            {
                                getIcon(student.decision)
                            }
                            <ul>
                                <li>
                                    {
                                        isHover == student.id &&
                                        <span>الرقم</span>
                                    }
                                    <span>{student.number.trim()}#</span>
                                </li>
                                <li>
                                    {
                                        isHover == student.id &&
                                        <span>الاسم</span>
                                    }
                                    {
                                        student.name.match(/^[a-z0-9_.,'"!?;:& ]+$/i)
                                        ? <span>{student.name.slice(1, 15).trim() + '...'}</span>
                                        : <span>{student.name.trim()}</span>
                                    }
                                </li>
                                <li>
                                    {
                                        isHover == student.id &&
                                        <span>الولاية</span>
                                    }
                                    <span>{student.state.trim()}</span>
                                </li>
                                <li>
                                    {
                                        isHover == student.id &&
                                        <span>المدرسة</span>
                                    }
                                    <span>{student.school.trim()}</span>
                                </li>
                                <li>
                                    {
                                        isHover == student.id &&
                                        <span>الدرجة</span>
                                    }
                                    <span>{student.result.toString().slice(0, 5)}</span>
                                </li>
                                <li>
                                    {
                                        isHover == student.id &&
                                        <span>النتيجة</span>
                                    }
                                    <span>{student.decision.trim()}</span>
                                </li>
                                <li>
                                    <span onClick={() => {
                                        dispatch(showResultActions.show({
                                                number: student.number,
                                                name: student.name,
                                                school: student.school,
                                                state: student.state,
                                                county: student.county,
                                                result: student.result,
                                                type: student.type,
                                                decision: student.decision,
                                                year: student.year.split('-')[0],
                                            }
                                        ))
                                        dispatch(sideActions.isOpen(true))
                                        dispatch(showResultActions.setOpen(true));
                                    }}> <FontAwesomeIcon icon={faEye} />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
            {isOpen && <Show/>}
        </>

    )
}
import Styles from "@/styles/ShowResults.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faCircleInfo, faGraduationCap, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {elementaryActions} from "@/redux/slices/elementarySlice";
import {showResultActions} from "@/redux/slices/showResultSlice";
import Congrat from "@/components/Congrat";

export default () => {
    const dispatch = useDispatch();
    const show = useSelector(state => state.showResult.data);

    function getMsg(value, name){
        if(value === 'راسب'){
            return <div className={Styles.msg}><p>أخي {name} وفقك الله، نأمل أن تجتهد في السنة القادمة، واعلم يقينا <strong>﴿ وَمَن يُطِعِ اللَّهَ وَرَسُولَهُ وَيَخْشَ اللَّهَ وَيَتَّقْهِ فَأُوْلَئِكَ هُمُ الْفَائِزُونَ ﴾. </strong> سورة النور [52]</p></div>
        }else if(value === 'الدورة التكميلية'){
            return <div className={Styles.msg}><p>أخي {name} مبارك لك، فقد قاربت النجاح، ونسأل الله لك التوفيق في الدورة التكميلية.</p></div>
        }else if(value === 'ناجح'){
            return
        }
    }

    function getColor(value){
        if(value === 'راسب'){
            return 'red';
        }else if(value === 'الدورة التكميلية'){
            return '#9c9c3d';
        }else if(value === 'ناجح'){
            return 'green';
        }else if(value === 'غائب'){
            return 'gray'
        }
    }

    return(
        <section className={Styles.show}>
            <FontAwesomeIcon icon={faXmark} onClick={() => dispatch(showResultActions.setOpen(false))} />
            <div>
                <div>
                    <h5>نتيجة الطالب/ة: {show.name}</h5>
                </div>
                <div className={Styles.index} style={{color: getColor(show.decision)}}>
                    <div>
                        <FontAwesomeIcon icon={faGraduationCap} />
                        <span>#{show.number}</span>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <span>الاسم</span>
                                <span>{show.name.trim()}</span>
                            </li>
                            <li>
                                <span>المدرسة</span>
                                <span>{show.school.trim()}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>الولاية</span>
                                <span>{show.state.trim()}</span>
                            </li>
                            <li>
                                <span>المقاطعة</span>
                                <span>{show.county.trim()}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>النوع</span>
                                <span>{show.type}</span>
                            </li>
                            <li>
                                <span>الدرجة</span>
                                <span>{show.result}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>النتيجة</span>
                                <span>{show.decision}</span>
                            </li>
                            <li>
                                <span>السنة</span>
                                <span>{show.year}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                show.decision === 'ناجح' &&
                <>
                    <Congrat />
                </>
            }
        </section>
    )
}
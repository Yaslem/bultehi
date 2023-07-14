import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import Styles from '@/styles/Msg.module.css';
export default ({icon, title, msg}) => {
    return(
        <div className={Styles.msg}>
            <div>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div>
                <h5>{title}</h5>
                <p>{msg}</p>
            </div>
            <div>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    )
}
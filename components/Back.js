import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Styles from '@/styles/Back.module.css';
import {useRouter} from "next/router";

export default () => {
    const router = useRouter();
    return(
        <div className={Styles.back} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} rotation={180} />
        </div>
    )
}
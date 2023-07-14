import Styles from '@/styles/Table.module.css';
import {faEye, faFilePen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default () => {
    return(
        <div className={Styles.table}>
            <table>
                <thead>
                <tr>
                    <th>الاسم</th>
                    <th>خيارات</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>العيون</td>
                        <td>
                            <span>
                                <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faFilePen} />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>العيون</td>
                        <td>
                            <span>
                                <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faFilePen} />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>العيون</td>
                        <td>
                            <span>
                                <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faFilePen} />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>العيون</td>
                        <td>
                            <span>
                                <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faFilePen} />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>العيون</td>
                        <td>
                            <span>
                                <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faFilePen} />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
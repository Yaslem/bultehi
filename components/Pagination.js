import Styles from '@/styles/Pagination.module.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
export default ({prev, next, url, paginationActionStatus, paginationAction, paginationActionsNext, paginationActionsCurrentPage, paginationActionsPrev, currentPage}) => {
    const dispatch = useDispatch();
    return(
        <div className={Styles.paginate}>
            {
                prev != 0
                 ? <span onClick={() => {
                        axios.get(`${url}?page=${prev}`).then(res => {
                            dispatch(paginationActionStatus(true))
                            dispatch(paginationAction(res.data))
                            dispatch(paginationActionsCurrentPage(res.data.current_page))
                            dispatch(paginationActionsNext(res.data.next  != null ? res.data.next.split('=')[1] : 0))
                            dispatch(paginationActionsPrev(res.data.prev != null ? res.data.prev.split('=')[1] : 0))
                        })
                    }}>السابق</span>
                : <span className={Styles.no}>السابق</span>
            }
            <div>
                <span>الصفحة الحالية [{currentPage}]</span>
            </div>
            {
                next != 0
                 ? <span onClick={() => {
                        axios.get(`${url}?page=${next}`).then(res => {
                            dispatch(paginationActionStatus(true))
                            dispatch(paginationAction(res.data))
                            dispatch(paginationActionsCurrentPage(res.data.current_page))
                            dispatch(paginationActionsNext(res.data.next  != null ? res.data.next.split('=')[1] : 0))
                            dispatch(paginationActionsPrev(res.data.prev != null ? res.data.prev.split('=')[1] : 0))
                        })
                    }}>التالي</span>
                 : <span className={Styles.no}>التالي</span>
            }
        </div>
    )
}
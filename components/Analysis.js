import useSWR from "swr";
import Loading from "@/components/Loading";
import {useSelector} from "react-redux";
import axios from "axios";
const fetcher = url => axios.get(url).then(res => res.data);

export default () => {
    const year = useSelector(state => state.educationYear.year);
    const { data, status, isError, isLoading } = useSWR(`year/${year}/analysis`, fetcher);
    if(isLoading) return <Loading />
    return (
        <div>
            {
                data.high.count_all != 0
                ? <div>
                        <div>
                            <p>مسابقة ختم الدروس الثانوية {year}</p>
                            <span>{data.high.count_all}</span>
                            <ul>
                                <li>
                                    <div>
                                        <span>الناجحون</span>
                                        <span>{data.high.count_students_is_admis}</span>
                                    </div>
                                    <div>
                                        <span>النسبة</span>
                                        <span>{Math.round(data.high.count_students_is_admis_percentage)}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span>الراسبون</span>
                                        <span>{data.high.count_students_is_ajourne}</span>
                                    </div>
                                    <div>
                                        <span>النسبة</span>
                                        <span>{Math.round(data.high.count_students_is_ajourne_percentage)}%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                : ''
            }
            {
                data.middle.count_all != 0
                    ? <div>
                        <div>
                            <p>مسابقة ختم الدروس الإعدادية {year}</p>
                            <span>{data.middle.count_all}</span>
                            <ul>
                                <li>
                                    <div>
                                        <span>الناجحون</span>
                                        <span>{data.middle.count_students_is_admis}</span>
                                    </div>
                                    <div>
                                        <span>النسبة</span>
                                        <span>{Math.round(data.middle.count_students_is_admis_percentage)}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span>الراسبون</span>
                                        <span>{data.middle.count_students_is_ajourne}</span>
                                    </div>
                                    <div>
                                        <span>النسبة</span>
                                        <span>{Math.round(data.middle.count_students_is_ajourne_percentage)}%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    : ''
            }
            {
                data.elementary.count_all != 0
                    ? <div>
                        <div>
                            <p>مسابقة ختم الدروس الابتدائية {year}</p>
                            <span>{data.elementary.count_all}</span>
                            <ul>
                                <li>
                                    <div>
                                        <span>الناجحون</span>
                                        <span>{data.elementary.count_students_is_admis}</span>
                                    </div>
                                    <div>
                                        <span>النسبة</span>
                                        <span>{Math.round(data.elementary.count_students_is_admis_percentage)}%</span>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span>الراسبون</span>
                                        <span>{data.elementary.count_students_is_ajourne}</span>
                                    </div>
                                    <div>
                                        <span>النسبة</span>
                                        <span>{Math.round(data.elementary.count_students_is_ajourne_percentage)}%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    : ''
            }
        </div>
    )
}
import Styles from '@/styles/Top.module.css';
import useSWR from "swr";
import axios from "axios";
import Loading from "@/components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {topActions} from "@/redux/slices/topSlice";
import Table from "@/components/Table";
export default ({high, middle, elementary, isLoading, isError}) => {
    const year = useSelector(state => state.educationYear.year);
    return(
        <section className={Styles.top}>
            <div>
                <span>العشرة الأوائل في بكالوريا {year}</span>
                <Table isLoading={isLoading} isError={isError} values={high} />
            </div>
            <div>
                <span>العشرة الأوائل في ابريفه {year}</span>
                <Table isLoading={isLoading} isError={isError} values={middle} />
            </div>
            <div>
                <span>العشرة الأوائل في كنكور {year}</span>
                <Table isLoading={isLoading} isError={isError} values={elementary} />
            </div>
        </section>
    )
}
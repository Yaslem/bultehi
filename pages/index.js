import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Top from "@/components/Top";
import {NextSeo} from "next-seo";
import Alert from "@/components/Alert";
import {faCircleExclamation, faE, faH, faM} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import HeaderPages from "@/components/HeaderPages";
import {useDispatch, useSelector} from "react-redux";
import useSWR from "swr";
import Loading from "@/components/Loading";
import {topActions} from "@/redux/slices/topSlice";
import axios from "axios";
import Select from "@/components/Select";
import Analysis from "@/components/Analysis";
const fetcher = url => axios.get(url).then(res => res.data);
export default function Home() {
    const dispatch = useDispatch();
    const year = useSelector(state => state.educationYear.year);
    const high = useSelector(state => state.top.high);
    const middle = useSelector(state => state.top.middle);
    const elementary = useSelector(state => state.top.elementary);
    const { data, status, isError, isLoading } = useSWR(`year/${year}/top`, fetcher);
    if(isLoading) return <Loading />
    dispatch(topActions.high(data.high))
    dispatch(topActions.middle(data.middle))
    dispatch(topActions.elementary(data.elementary))
  return (
      <>
          <NextSeo
              title="بلتيهي - الرئيسية"
          />
          <main className={styles.index}>
              <div className={styles.welcome}>
                  <Analysis />
              </div>
              <Alert
                  title={'تنبيه'}
                  type={'warning'}
                  icon={<FontAwesomeIcon icon={faCircleExclamation}/>}
                  msg={'لعرض جميع النتائج أو الأوائل من كل ولاية أو مدرسة.. رجاء اضغط على نوع المسابقة في الشريط الجانبي.'} />
              <Top high={high} elementary={elementary} middle={middle} isLoading={isLoading} isError={isError} />
          </main>
      </>
  )
}

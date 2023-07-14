import Styles from '@/styles/HeaderPages.module.css'
import {useRouter} from "next/router";
import Back from "@/components/Back";
export default ({title, route, add, isBack = true}) => {
    const router = useRouter();
    return(
        <section className={Styles.header}>
            {
                isBack && <Back />
            }
            <div>
                <h3>{title}</h3>
                {add ? <span onClick={() => router.push(router.pathname + route)}>{add}</span> : ''}
            </div>
        </section>
    )
}
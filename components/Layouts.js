import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Styles from '@/styles/Layouts.module.css'
import Footer from "@/components/Footer";

export default (props) => {
    return (
        <main className={Styles.layouts}>
            <div className={Styles.main}>
                <Header />
                <main className={Styles.index}>
                    {props.children}
                </main>
                <Footer />
            </div>
            <SideBar/>
        </main>
    )
}
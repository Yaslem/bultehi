import '@/styles/globals.css';
import Layouts from '@/components/Layouts'
import {useRouter} from "next/router";
import store from '@/redux/store'
import {Provider, useDispatch} from 'react-redux';
import axios from "axios";
import {DefaultSeo} from "next-seo";
import SEO from '@/seo.config';
axios.defaults.baseURL = 'https://api.bultehi.com/api';
export default function App({ Component, pageProps }) {
    const router = useRouter();
    console.log('مرحبا بكم في موقع بلتيهي! الموقع الأفضل في عرض نتائج المسابقات الوطنية.')
    switch (router.pathname){
        case '/register':
            return (
                <>
                    <Component {...pageProps} />
                </>
            );
            break;
        case '/login':
            return (
                <>
                    <Component {...pageProps} />
                </>
            );
            break;
        default:
            return (
                <Provider store={store}>
                    <DefaultSeo {...SEO} />
                    <Layouts>
                        <Component {...pageProps} />
                    </Layouts>
                </Provider>
            );
    }
}

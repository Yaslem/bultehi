import Styles from '@/styles/FormAdd.module.css';
import {useState} from "react";
import axios from "axios";
import HeaderPages from "@/components/HeaderPages";
import {yearsActions} from "@/redux/slices/yearsSlice";
import {useDispatch, useSelector} from "react-redux";
import useSWR from "swr";
import Loading from "@/components/Loading";
const fetcher = url => axios.get(url).then(res => res.data);
export default ({url, titleAdd, inptuNmae}) => {
    const dispatch = useDispatch();
    const { data, isError, isLoading } = useSWR(`/education-years`, fetcher);
    dispatch(yearsActions.get(data))

    const types = useSelector(state => state.types.types);
    const years = useSelector(state => state.years.years);

    const [excel, setExcel] = useState('');
    const [type, setType] = useState('');
    const [id, setID] = useState('');
    const [errorExcel, setErrorExcel] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(`${inptuNmae}`, excel);
        formData.append("type", type);
        formData.append("id", id);

        try {
            // We will send formData object as a data to the API URL here.
            const response = await axios.post(`/${url}/store`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then((res) => {
                alert("File Uploaded Successfully");
            }).catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }
    }

    if(isLoading) return <Loading />

    return (
        <section className={Styles.add}>
            <HeaderPages title={titleAdd} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>سنة المسابقة</label>
                    <select onChange={e => setID(e.target.value)}>
                        {
                            years.data.map(value =>
                                <option value={value.id} >{value.name.trim()}</option>
                            )
                        }
                    </select>
                    {
                        errorExcel.length > 0 &&
                        <span>{errorExcel}</span>
                    }
                </div>
                <div>
                    <label>نوع المسابقة</label>
                    <select onChange={e => setType(e.target.value)}>
                        {
                            types.data.map(value =>
                                <option value={value.id} >{value.name.trim()}</option>
                            )
                        }
                    </select>
                    {
                        errorExcel.length > 0 &&
                        <span>{errorExcel}</span>
                    }
                </div>
                <div>
                    <label>ملف اكسل</label>
                    <input type="file" onChange={e => setExcel(e.target.files[0])}/>
                    {
                        errorExcel.length > 0 &&
                        <span>{errorExcel}</span>
                    }
                </div>
                <button>حفظ النتائج</button>
            </form>
        </section>
    )
}

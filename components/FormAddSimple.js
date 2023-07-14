import Styles from "@/styles/FormAdd.module.css";
import HeaderPages from "@/components/HeaderPages";
import {useState} from "react";
import {useRouter} from "next/router";
import swal from 'sweetalert';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {typesActions} from "@/redux/slices/typesSlice";
import Loading from "@/components/Loading";
import useSWR from "swr";
const fetcher = url => axios.get(url).then(res => res.data);
export default ({
    label,
    placeholder,
    url,
    titleState = null,
    titleEdit = null,
    titleNew = null,
    submit,
    typeInput,
    isType = false,
    edit = false
}) => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types.types)
    const loading = useSelector(state => state.loading.isLoading)
    const router = useRouter();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [errorName, setErrorName] = useState('');

    const { data, isError, isLoading } = useSWR(`/contest-types`, fetcher);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("type", type);
        formData.append("name", name);

        if (name.length > 0){
            axios.post(`/${url}/store`, formData).then(res => {
                if(res.data.status === 'success'){
                    swal({
                        title: 'تم!',
                        text: 'تمت الإضافة بنجاح.',
                        icon: "success",
                        button: false,
                        timer: 2000,
                    });
                    router.back();
                }else {
                    swal({
                        title: 'خطأ!',
                        text: 'يوجد خطأ ما.',
                        icon: "error",
                        button: false,
                        timer: 2000,
                    });
                }
            })
        }else {
            setErrorName('الاسم مطلوب.')
        }
    }

    const submitHandlerEdit = (e) => {
        e.preventDefault();

        if (name.length > 0){
            axios.put(`/${url}/edit/${titleState[0]}`, {name})
            .then(res => {
                if (res.data.status === 'success') {
                    swal({
                        title: 'تم!',
                        text: 'تم التعديل بنجاح.',
                        icon: "success",
                        button: false,
                        timer: 2000,
                    });
                    router.back();
                } else {
                    swal({
                        title: 'خطأ!',
                        text: 'يوجد خطأ ما.',
                        icon: "error",
                        button: false,
                        timer: 2000,
                    });
                }
            })
        }
    }

    if (isLoading) return  <Loading />
    dispatch(typesActions.get(data));
    return(
        <section className={Styles.add}>
            {
                edit === true
                    ?(
                        <>
                            <HeaderPages title={titleEdit} />
                            <div>
                                <form onSubmit={submitHandlerEdit}>
                                    <div>
                                        <label>{label}</label>
                                        <input
                                            placeholder={placeholder}
                                            type={typeInput}
                                            defaultValue={titleState[1]}
                                            onChange={e => {
                                                setName(e.target.value)
                                            }}

                                        />

                                        {
                                            errorName.length > 0 &&
                                            <span>{errorName}</span>
                                        }
                                    </div>
                                    <button>{submit}</button>
                                </form>
                            </div>
                        </>
                    ):(
                        <>
                            <HeaderPages title={titleNew} />
                            <div>
                                <form onSubmit={submitHandler}>
                                    {
                                        isType == true &&
                                        <div>
                                            <label>نوع المسابقة</label>
                                            <select onChange={e => setType(e.target.value)}>
                                                {
                                                    types.data?.map(value =>
                                                        <option value={value.id} >{value.name.trim()}</option>
                                                    )
                                                }
                                            </select>
                                            {
                                                errorName.length > 0 &&
                                                <span>{errorName}</span>
                                            }
                                        </div>
                                    }
                                    <div>
                                        <label>{label}</label>
                                        <input
                                            placeholder={placeholder}
                                            type={typeInput}
                                            onChange={e => {
                                                setName(e.target.value)
                                            }}
                                        />
                                        {
                                            errorName.length > 0 &&
                                            <span>{errorName}</span>
                                        }
                                    </div>
                                    <button>{submit}</button>
                                </form>
                            </div>
                        </>
                    )
            }
        </section>
    )
}
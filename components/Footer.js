import Image from "next/image";
import Styles from '@/styles/Footer.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default () => {
    return(
        <footer className={Styles.footer}>
            <div>
                <p>جميع الحقوق محفوظة 1444 - 2023</p>
            </div>
            <section>
                <div>
                    <Link href={'https://www.facebook.com/bultehi'} target={"_blank"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={40}
                            height={40}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#0A6EBD"
                                d="M20 12.05a8 8 0 1 0-9.25 8v-5.67h-2v-2.33h2v-1.77a2.83 2.83 0 0 1 3-3.14c.6.008 1.198.062 1.79.16v2h-1a1.16 1.16 0 0 0-1.3 1.26v1.51h2.22l-.36 2.33h-1.85V20A8 8 0 0 0 20 12.05Z"
                            />
                        </svg>
                    </Link>
                </div>
                <div>
                    <Link href={'https://api.whatsapp.com/send?phone=22249474968&text="السلام عليكم ورحمة الله وبركاته."'} target={"_blank"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlSpace="preserve"
                            width={30}
                            height={30}
                            viewBox="0 0 100 100"
                        >
                            <g id="SVGRepo_iconCarrier">
                                <style>
                                    {".st125{fill-rule:evenodd;clip-rule:evenodd;fill:#f1f1f1}"}
                                </style>
                                <g id="Layer_2">
                                    <path
                                        d="M82.773 17.048c-38.434-37.321-98.728 8.848-72.606 55.645L3.622 96.589l24.455-6.412c46.787 24.737 91.578-35.212 54.696-73.129z"
                                        className="st125"
                                    />
                                    <path
                                        d="M50.143 88.745c-7.593.027-14.974-2.253-21.34-6.295l-14.796 3.879 3.95-14.421c-4.438-6.577-6.941-14.291-6.907-22.275-.07-34.549 42.425-52.164 66.746-27.615 24.516 24.34 6.906 66.803-27.653 66.727z"
                                        style={{
                                            fillRule: "evenodd",
                                            clipRule: "evenodd",
                                            fill: "#66e066",
                                        }}
                                    />
                                    <path
                                        d="M71.585 59.476c-1.175-.588-6.953-3.431-8.03-3.823-1.077-.392-1.861-.588-2.644.589-.784 1.176-3.034 3.822-3.72 4.605-.685.785-1.371.883-2.546.295-2.539.339-15.564-10.676-15.988-13.97-.685-1.175-.073-1.812.516-2.398 1.023-1.123 2.318-2.535 2.937-4.018.392-.785.196-1.471-.098-2.059-.294-.588-2.578-6.4-3.623-8.723-.88-1.957-1.807-1.996-2.644-2.031-1.983.031-3.518-.484-5.386 1.443-7.004 6.741-3.792 16.214.685 21.955.587.784 8.13 13.028 20.075 17.738 9.927 3.915 11.947 3.136 14.102 2.94 2.155-.196 6.953-2.842 7.932-5.586.979-2.744.979-5.096.686-5.587-.295-.488-1.079-.782-2.254-1.37z"
                                        className="st125"
                                    />
                                </g>
                            </g>
                        </svg>
                    </Link>
                </div>
            </section>
        </footer>
    );
}
import { useForm, Head, router } from "@inertiajs/react";
import Homelayout from "@/Layouts/HomeLayout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatToRupiah } from "@/Constants/constants";
import { FaCoins, FaNetworkWired } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { WiTime3 } from "react-icons/wi";
import Modal from "@/Components/Modal";
import Login from "@/Components/Login";
import Register from "@/Components/Register";
import { useState } from "react";
dayjs.extend(relativeTime);

export default function Jobdetail({ auth, job, canResetPassword }) {
    const [isOnLoginModal, setIsOnLoginModal] = useState(true);
    const [applying, setApplying] = useState(false);

    const closeModal = () => {
        setApplying(false);
    };
    const { data, setData, post, processing, errors } = useForm({
        job_id: job.id,
        applicant_id: auth.user ? auth.user.id : "",
    });

    const applyJob = (e) => {
        e.preventDefault();
        router.post(route("job.apply", job.id), {});
    };

    useState(() => {}, [isOnLoginModal]);

    return (
        <>
            <Head title={job.job_name} />
            <Homelayout user={auth.user ? auth.user : ""}>
                <img
                    src="/images/rec_banners_2.jpg"
                    alt="Banner"
                    className="w-full max-h-[20rem] object-cover"
                />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className="">
                            <div className="flex mb-8 sm:mb-0 gap-4 justify-between px-4 my-2">
                                <h1 className="text-3xl  dark:text-white font-bold">
                                    {job.job_name}
                                </h1>
                            </div>
                            <div className="bg-white sm:dark:bg-gray-800 dark:bg-gray-800 px-5 py-7  sm:rounded-lg shadow-lg my-2">
                                <div className="grid gap-2 sm:grid-cols-3">
                                    <div>
                                        <div className="flex items-center dark:text-white">
                                            <svg
                                                className="w-5 h-5 text-gray-700  dark:text-gray-300 mr-1"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.5 2.75C6.65 2.75 4.375 5.025 4.375 7.875c0 3.637 4.25 7.96 4.25 7.96s4.25-4.323 4.25-7.96c0-2.85-2.275-5.125-5.125-5.125zm0 7.125a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" />
                                            </svg>
                                            <span>{job.job_place}</span>
                                        </div>
                                        <div className="flex items-center dark:text-white">
                                            <MdWork className="me-2" />
                                            <span>
                                                {job.job_type.job_type_name}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center dark:text-white">
                                            <WiTime3 className="me-2" />
                                            <span>
                                                Minimum {job.min_experience}{" "}
                                                years experience
                                            </span>
                                        </div>
                                        <div className="flex items-center dark:text-white">
                                            <FaCoins className="me-2" />
                                            <span>
                                                {formatToRupiah(
                                                    job.min_rate_salary,
                                                )}{" "}
                                                -{" "}
                                                {formatToRupiah(
                                                    job.max_rate_salary,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-2">
                                        <p className="text-gray-400">
                                            {dayjs(job.date_listed).fromNow()}{" "}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setApplying(true);
                                            }}
                                            className="bg-green-600 text-white px-2 py-2  hover:bg-green-700 focus:outline-none focus:ring-0 focus:ring-green-400"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:p-5">
                                <div className="mx-4 my-4 text-gray-700 dark:text-gray-300">
                                    <h1 className="text-2xl mb-2 font-semibold">
                                        Requirement
                                    </h1>
                                    <ul className="list-disc pl-5">
                                        {typeof job.requirement === "string" ? (
                                            JSON.parse(job.requirement).map(
                                                (req, index) => (
                                                    <li key={index}>{req}</li>
                                                ),
                                            )
                                        ) : (
                                            <li>No requirements provided</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="mx-4 my-4 text-gray-700 dark:text-gray-300">
                                    <h1 className="text-2xl mb-2 font-semibold">
                                        Responsibilities
                                    </h1>
                                    <ul className="list-disc pl-5">
                                        {typeof job.responsibilities ===
                                        "string" ? (
                                            JSON.parse(
                                                job.responsibilities,
                                            ).map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))
                                        ) : (
                                            <li>
                                                No responsibilitiess provided
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <p className="mx-4 my-4 text-sm text-gray-500 dark:text-gray-400">
                                    Expired {dayjs(job.date_expired).fromNow()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal maxWidth="sm" show={applying} onClose={closeModal}>
                    {auth.user ? (
                        !auth.user.email_verified_at ? (
                            <div>not verified</div>
                        ) : // 'address' => ['nullable', 'string', 'max:255'],
                        // 'phone' => ['nullable', 'string', 'max:15'],
                        // 'portfolio' => ['nullable', 'string', 'url'], // Assuming this is a URL
                        // 'gender' => ['nullable', 'in:man,woman'], // Add acceptable values
                        // 'education' => ['nullable', 'string', 'max:255'],
                        // 'work_experience' => ['nullable', 'integer', 'max:255'],
                        // 'curriculum_vitae' => ['nullable', 'file', 'mimes:pdf'], // If uploading a file
                        !auth.user.address ||
                          !auth.user.phone ||
                          !auth.user.portfolio ||
                          !auth.user.gender ||
                          !auth.user.education ||
                          !auth.user.work_experience ||
                          !auth.user.curriculum_vitae ? (
                            <>list of incomplete data</>
                        ) : (
                            <></>
                        )
                    ) : isOnLoginModal ? (
                        <Login
                            setIsOnLoginModal={setIsOnLoginModal}
                            canResetPassword={canResetPassword}
                        />
                    ) : (
                        <Register setIsOnLoginModal={setIsOnLoginModal} />
                    )}
                </Modal>
            </Homelayout>
        </>
    );
}

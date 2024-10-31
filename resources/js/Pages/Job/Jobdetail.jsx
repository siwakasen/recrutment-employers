import { useForm, Head, router, Link } from "@inertiajs/react";
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
import { toast } from "sonner";
dayjs.extend(relativeTime);

export default function Jobdetail({ auth, job, canResetPassword, isApplied }) {
    console.log(isApplied);
    const [isOnLoginModal, setIsOnLoginModal] = useState(true);
    const [isApplyModal, setIsApplyModal] = useState(false);
    const [status, setStatus] = useState("");

    const closeModal = () => {
        setIsApplyModal(false);
    };
    const { data, post, processing } = useForm({
        job_id: job.job_id,
        applicant_id: auth.user ? auth.user.applicant_id : "",
        status: "waiting_approval",
    });

    const applyJob = (e) => {
        e.preventDefault();
        post(route("job.apply", job.id), {
            onSuccess: () => {
                toast.success(
                    `You have successfully applied for ${job.job_name}`,
                );
                setIsApplyModal(false);
            },
        });
    };

    const submitEmail = (e) => {
        e.preventDefault();
        post(route("verification.send"), {
            onSuccess: () => {
                setStatus("verification-link-sent");
            },
        });
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
                                                setIsApplyModal(true);
                                            }}
                                            disabled={isApplied}
                                            className={` 
                                                disabled:bg-slate-300
                                                disabled:dark:bg-slate-700 bg-green-600 text-white px-2 py-2  hover:bg-green-700 focus:outline-none focus:ring-0 focus:ring-green-400`}
                                        >
                                            {isApplied
                                                ? "Already Apllied"
                                                : "Apply"}
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
                <Modal maxWidth="sm" show={isApplyModal} onClose={closeModal}>
                    {auth.user ? (
                        !auth.user.email_verified_at ? (
                            <div className="w-full   px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg ">
                                <div className="mb-4 text-sm text-gray-400">
                                    Please verify your email first before apply
                                </div>

                                {status === "verification-link-sent" && (
                                    <div className="mb-4 font-medium text-sm text-green-400">
                                        A new verification link has been sent to
                                        the email address you provided during
                                        registration.
                                    </div>
                                )}
                                <form onSubmit={submitEmail}>
                                    <div className="mt-4 flex items-center justify-between">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-600"
                                        >
                                            {processing
                                                ? "Please wait . . ."
                                                : "Resend Verification Email"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : !auth.user.address ||
                          !auth.user.phone ||
                          !auth.user.portfolio ||
                          !auth.user.gender ||
                          !auth.user.education ||
                          !auth.user.work_experience ||
                          !auth.user.curriculum_vitae ? (
                            <div className="w-full  px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg ">
                                <div className=" font-bold py-2 dark:text-gray-100 flex border-b-[0.5px]">
                                    Incomplete data
                                </div>
                                <div className="py-3 px-2">
                                    {/* make a list */}
                                    <ul className="list-disc pl-5 dark:text-white">
                                        {!auth.user.address && <li>Address</li>}
                                        {!auth.user.phone && <li>Phone</li>}
                                        {!auth.user.portfolio && (
                                            <li>Portfolio</li>
                                        )}
                                        {!auth.user.gender && <li>Gender</li>}
                                        {!auth.user.education && (
                                            <li>Education</li>
                                        )}
                                        {!auth.user.work_experience && (
                                            <li>Work Experience</li>
                                        )}
                                        {!auth.user.curriculum_vitae && (
                                            <li>Curriculum Vitae</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        href={route("profile.edit")}
                                        className="bg-blue-600 text-white px-2 py-1 rounded-md  hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-400"
                                    >
                                        Update Profile
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full  mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg ">
                                <div className="text-2xl font-bold mb-2 dark:text-gray-100 flex justify-center">
                                    Apply Job
                                </div>
                                <div className="mb-4 font-medium text-sm text-green-600 text-center">
                                    You are applying for{" "}
                                    <i className="font-bold">{job.job_name}</i>
                                </div>
                                <div className="flex justify-center">
                                    <form onSubmit={applyJob}>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-green-600 text-white px-2 py-2  hover:bg-green-700 focus:outline-none focus:ring-0 focus:ring-green-400"
                                        >
                                            {processing
                                                ? "Please wait . . ."
                                                : "Apply Now"}
                                        </button>
                                    </form>
                                </div>
                            </div>
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

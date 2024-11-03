import React, { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import Homelayout from "@/Layouts/HomeLayout";
import PaginationCool from "@/Components/PaginationCool";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaClock } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import Modal from "@/Components/Modal";
import { toast } from "sonner";
import UploadContractForm from "@/Components/Applications/UploadContractForm";
dayjs.extend(relativeTime);

export default function Index({ auth, applications }) {
    const { data, delete: post, processing, setData } = useForm({});
    const [confirming, setConfirming] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const stages = [
        {
            id: "waiting_approval",
            label: "Waiting Approval",
            roundColor: "bg-yellow-500",
            bgcolor: "bg-yellow-100",
            textcolor: "text-yellow-600",
            icon: <FaClock />,
        },
        {
            id: "interview",
            label: "Interview",
            roundColor: "bg-blue-500",
            bgcolor: "bg-blue-100",
            textcolor: "text-blue-600",
            icon: <IoPeople />,
        },
        {
            id: "offered",
            label: "Offered",
            roundColor: "bg-purple-500",
            bgcolor: "bg-purple-100",
            textcolor: "text-purple-600",
            icon: <MdLocalOffer />,
        },
        {
            id: "hired",
            label: "Hired",
            roundColor: "bg-green-500",
            bgcolor: "bg-green-100",
            textcolor: "text-green-600",
            icon: <PiBagSimpleFill />,
        },
    ];

    const submit = (e) => {
        e.preventDefault();
        if (!confirming) {
            setConfirming(true);
            return;
        }
        post(route("application.cancel", data), {
            onSuccess: () => {
                setConfirming(false);
                setIsModalOpen(false);
                toast.success("Your application has been cancelled.");
            },
        });
    };

    const searchFunctionHandler = (e) => {
        e.preventDefault();
        router.visit(route("applications.show"), {
            method: "get",
            data: { search: searchInput },
            only: ["applications"],
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const openModal = (application) => {
        setData(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setConfirming(false);
    };

    // Roadmap component
    const ApplicationRoadmap = ({ status }) => {
        // accepted status is showed as interview for the user
        if (status === "accepted") status = "interview";
        const currentStageIndex = stages.findIndex(
            (stage) => stage.id === status,
        );

        return (
            <div className="flex items-center">
                {stages.map((stage, index) => (
                    <div key={index} className="flex items-center">
                        {/* Circle for each stage */}
                        <div
                            className={`w-4 h-4 rounded-full ${
                                index === currentStageIndex
                                    ? stage.roundColor
                                    : "bg-gray-300 dark:bg-gray-100"
                            }`}
                        ></div>

                        {/* Label for each stage */}
                        <div className="ml-2 text-center">
                            <p className="text-sm font-semibold dark:text-gray-100">
                                {stage.label}
                            </p>
                        </div>

                        {
                            // Don't show the last line if it's the last stage
                            index === stages.length - 1 ? null : (
                                <div
                                    className={`w-10 h-[2px] mx-1 bg-gray-300 dark:bg-gray-100`}
                                ></div>
                            )
                        }
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Head title="Applications" />
            <Homelayout user={auth.user ? auth.user : ""} canResetPassword={""}>
                <img
                    src="/images/rec_banners_2.jpg"
                    alt="Banner"
                    className="w-full max-h-[20rem] object-cover"
                />

                <div className="pb-12 sm:relative -top-8">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form
                            onSubmit={searchFunctionHandler}
                            className="flex items-center space-x-2 bg-white sm:dark:bg-gray-800 dark:bg-gray-900 px-5 py-7 sm:rounded-2xl shadow-lg sm:my-2"
                        >
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search Job"
                                className="w-full px-4 py-2 border border-gray-300 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none focus:ring-0 dark:border-gray-700 focus:border-blue dark:focus:border-gray-800"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-400"
                            >
                                <i className="fas fa-search"></i> Search
                            </button>
                        </form>

                        <PaginationCool
                            links={applications.links}
                            from={applications.from}
                            to={applications.to}
                            total={applications.total}
                            data_length={applications.data.length}
                        />

                        <div className="px-4 lg:px-0">
                            {applications.data.map((application, index) => (
                                <button
                                    key={index}
                                    className="w-full"
                                    disabled={
                                        application.status === "rejected" ||
                                        application.status === "cancelled"
                                    }
                                    onClick={() => {
                                        openModal(application);
                                    }}
                                >
                                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-4 border border-gray-200 dark:border-none hover:shadow-lg transition-shadow w-full ">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold dark:text-gray-300 flex flex-col lg:flex-row gap-1">
                                                <span>
                                                    {application.job.job_name}
                                                </span>
                                                {application.status !==
                                                    "rejected" &&
                                                    application.status !==
                                                        "cancelled" && (
                                                        <span className="text-gray-400 text-xs mt-1 text-start">
                                                            Click for details
                                                        </span>
                                                    )}
                                            </span>
                                            {application.status ===
                                            "rejected" ? (
                                                <div className=" text-red-600 text-sm bg-red-100 px-2 py-1 rounded font-extrabold flex items-center gap-2">
                                                    <MdCancel />
                                                    Rejected
                                                </div>
                                            ) : application.status ===
                                              "cancelled" ? (
                                                <div className=" text-red-600 text-sm bg-red-100 px-2 py-1 rounded font-extrabold flex items-center gap-2">
                                                    <MdCancel />
                                                    Cancelled
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="hidden lg:block px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded-lg">
                                                        <ApplicationRoadmap
                                                            status={
                                                                application.status
                                                            }
                                                        />
                                                    </div>
                                                    <div className="lg:hidden">
                                                        {stages
                                                            .filter((stage) =>
                                                                application.status ===
                                                                "accepted"
                                                                    ? stage.id ===
                                                                      "interview"
                                                                    : stage.id ===
                                                                      application.status,
                                                            )
                                                            .map((stage) => (
                                                                <div
                                                                    key={
                                                                        stage.id
                                                                    }
                                                                    className={`flex items-center gap-2 px-2 py-1 rounded font-extrabold text-sm ${stage.bgcolor} ${stage.textcolor}`}
                                                                >
                                                                    {stage.icon}
                                                                    <span>
                                                                        {
                                                                            stage.label
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-300 mt-1 text-sm text-start">
                                            Applied on{" "}
                                            {dayjs(
                                                application.created_at,
                                            ).fromNow()}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal maxWidth="md" show={isModalOpen} onClose={closeModal}>
                    <div className="w-full   px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg ">
                        <div className=" text-white ">
                            <div className="text-center text-md text-gray-200 border-b p-3 border-slate-600">
                                Current application status is{" "}
                                {stages
                                    .filter((stage) =>
                                        data.status === "accepted"
                                            ? stage.id === "interview"
                                            : stage.id === data.status,
                                    )
                                    .map((stage) => (
                                        <span
                                            key={stage.id}
                                            className={`gap-2 px-1 py-0.5 rounded font-extrabold text-sm ${stage.bgcolor} ${stage.textcolor}`}
                                        >
                                            <span>{stage.label}</span>
                                        </span>
                                    ))}
                            </div>
                            {data.status === "offered" ||
                            data.status === "hired" ? (
                                <>
                                    <UploadContractForm application={data} />
                                </>
                            ) : null}

                            <div className="flex items-center justify-between mt-4">
                                <form onSubmit={submit} className="">
                                    <div className="flex items-center ">
                                        {data.status !== "hired" && (
                                            <button
                                                disabled={processing}
                                                type="submit"
                                                className="mt-4 px-2 py-1 text-sm bg-red-600 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                {confirming
                                                    ? "Click again to confirm your cancellation"
                                                    : "Cancel Application"}
                                            </button>
                                        )}
                                    </div>
                                </form>
                                <button
                                    onClick={closeModal}
                                    className="mt-4 px-2 py-1 bg-gray-600 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Homelayout>
        </>
    );
}

import { useState, Fragment } from "react";
import DangerButton from "@/Components/DangerButton";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "sonner";
import SecondaryButton from "../SecondaryButton";
import Modal from "@/Components/Modal";
export default function TableApplications({ applications, role_id }) {
    console.log(role_id);
    const [expandedApplicants, setExpandedApplicants] = useState([]);
    const [application, setApplication] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const { data, setData, patch, errors, processing } = useForm({
        status: "",
    });

    const closeModal = () => {
        setOpenModal(false);
    };

    const changeStatus = (e) => {
        e.preventDefault();
        if (role_id === 2) {
            patch(route("applications.accept", application), {
                data: data,
                onSuccess: () => {
                    toast.success("Status updated successfully.");
                },
                onError: () => {
                    toast.error(errors.status);
                },
                onFinish: () => {
                    closeModal();
                },
            });
            return;
        }
        patch(route("applications.update", application), {
            data: data,
            onSuccess: () => {
                toast.success("Status updated successfully.");
            },
            onError: () => {
                toast.error(errors.status);
            },
            onFinish: () => {
                closeModal();
            },
        });
    };

    const stages = [
        { id: "rejected", bgcolor: "bg-red-100", textcolor: "text-red-600" },
        {
            id: "waiting_approval",
            bgcolor: "bg-yellow-100",
            textcolor: "text-yellow-600",
        },
        { id: "interview", bgcolor: "bg-blue-100", textcolor: "text-blue-600" },
        {
            id: "offered",
            bgcolor: "bg-purple-100",
            textcolor: "text-purple-600",
        },
        {
            id: "accepted",
            bgcolor: "bg-green-100",
            textcolor: "text-green-600",
        },
        { id: "hired", bgcolor: "bg-green-100", textcolor: "text-green-600" },
        { id: "cancelled", bgcolor: "bg-red-100", textcolor: "text-red-600" },
    ];

    const toggleAccordion = (applicantId) => {
        setExpandedApplicants((prev) =>
            prev.includes(applicantId)
                ? prev.filter((id) => id !== applicantId)
                : [...prev, applicantId],
        );
    };

    const getFullURL = (path) => {
        if (path.startsWith("http") || path.startsWith("https")) {
            return path;
        }
        return `${window.location.origin}${path}`;
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", options);
    };

    const formatStatus = (status) => {
        return status
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const viewDocument = (employment_contract) => {
        if (employment_contract) {
            window.open(getFullURL(employment_contract), "_blank");
        }
    };

    const getAvailableOptions = (currentStatus) => {
        switch (currentStatus) {
            case "waiting_approval":
                return ["rejected", "interview"];
            case "accepted":
                return ["offered"];
            case "offered":
                return ["rejected", "hired"];
            case "interview":
                return ["rejected", "accepted"];
            default:
                return [];
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                            Job Name
                        </th>
                        <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                            Applicant Information
                        </th>
                        <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                            Employment Contract
                        </th>
                        <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                            Date Applied
                        </th>
                        <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                            Change Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                    {applications.map((application, index) => {
                        const stage = stages.find(
                            (s) => s.id === application.status,
                        );
                        const availableOptions = getAvailableOptions(
                            application.status,
                        );
                        return (
                            <Fragment key={application.application_id}>
                                <tr
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50 dark:bg-gray-900"
                                            : "bg-white dark:bg-gray-800"
                                    }
                                >
                                    <td className="px-6 py-4 whitespace-no-wrap text-md text-gray-900 dark:text-slate-300">
                                        {application.job.job_name}
                                    </td>
                                    <td className="px-8 py-4 whitespace-no-wrap text-md text-gray-900 dark:text-slate-300">
                                        {application.applicant.applicant_name}
                                        <button
                                            onClick={() =>
                                                toggleAccordion(
                                                    application.application_id,
                                                )
                                            }
                                            className="ml-2 text-blue-600 hover:underline"
                                        >
                                            <span className="text-sm">
                                                {expandedApplicants.includes(
                                                    application.application_id,
                                                )
                                                    ? "Hide Details"
                                                    : "View Details"}
                                            </span>
                                        </button>
                                    </td>
                                    <td className="px-8 py-4 whitespace-no-wrap text-md text-gray-900 dark:text-slate-300">
                                        <span
                                            className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${stage?.bgcolor || ""} ${stage?.textcolor || ""}`}
                                        >
                                            {formatStatus(application.status)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 whitespace-no-wrap text-md text-gray-900 dark:text-slate-300">
                                        <SecondaryButton
                                            disabled={
                                                !application.employment_contract
                                            }
                                            onClick={() =>
                                                viewDocument(
                                                    application.employment_contract,
                                                )
                                            }
                                        >
                                            View Document
                                        </SecondaryButton>
                                    </td>
                                    <td className="px-8 py-4 whitespace-no-wrap text-md text-gray-900 dark:text-slate-300">
                                        {formatDate(application.created_at)}
                                    </td>
                                    <td className="whitespace-no-wrap text-md text-gray-900 dark:text-slate-300 py-4 flex">
                                        {availableOptions.map((option) => {
                                            const isRejected =
                                                option === "rejected";
                                            const isOffered =
                                                option === "offered";
                                            const isHired = option === "hired";
                                            const isInterview =
                                                option === "interview";
                                            const isAccepted =
                                                option === "accepted";

                                            const handleClick = () => {
                                                setData("status", option);
                                                setApplication(application);
                                                setOpenModal(true);
                                            };

                                            if (
                                                role_id === 1 &&
                                                application.status !==
                                                    "interview"
                                            ) {
                                                if (isRejected) {
                                                    return (
                                                        <DangerButton
                                                            key={option}
                                                            className="mr-2"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Reject
                                                        </DangerButton>
                                                    );
                                                } else if (isOffered) {
                                                    return (
                                                        <PrimaryButton
                                                            key={option}
                                                            className="mr-2"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Offer
                                                        </PrimaryButton>
                                                    );
                                                } else if (isHired) {
                                                    return (
                                                        <PrimaryButton
                                                            key={option}
                                                            className="mr-2"
                                                            disabled={
                                                                !application.employment_contract
                                                            }
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Hire
                                                        </PrimaryButton>
                                                    );
                                                } else if (isInterview) {
                                                    return (
                                                        <PrimaryButton
                                                            key={option}
                                                            className="mr-2"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Approve
                                                        </PrimaryButton>
                                                    );
                                                } else {
                                                    return (
                                                        <PrimaryButton
                                                            key={option}
                                                            className="mr-2"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            {formatStatus(
                                                                option,
                                                            )}
                                                        </PrimaryButton>
                                                    );
                                                }
                                            } else if (role_id === 2) {
                                                if (isRejected) {
                                                    return (
                                                        <DangerButton
                                                            key={option}
                                                            className="mr-2"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Reject
                                                        </DangerButton>
                                                    );
                                                } else if (isAccepted) {
                                                    return (
                                                        <PrimaryButton
                                                            key={option}
                                                            className="mr-2"
                                                            onClick={
                                                                handleClick
                                                            }
                                                        >
                                                            Accept
                                                        </PrimaryButton>
                                                    );
                                                }
                                            }

                                            return null;
                                        })}
                                    </td>
                                </tr>

                                {expandedApplicants.includes(
                                    application.application_id,
                                ) && (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-4 bg-gray-100 dark:bg-gray-900 text-md text-gray-900 dark:text-slate-300"
                                        >
                                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 border rounded-lg">
                                                <div>
                                                    <p>
                                                        <strong>
                                                            Applicant Name:
                                                        </strong>{" "}
                                                        {
                                                            application
                                                                .applicant
                                                                .applicant_name
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>Email:</strong>{" "}
                                                        {
                                                            application
                                                                .applicant.email
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Address:
                                                        </strong>{" "}
                                                        {
                                                            application
                                                                .applicant
                                                                .address
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>Phone:</strong>{" "}
                                                        {
                                                            application
                                                                .applicant.phone
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>Gender:</strong>{" "}
                                                        {
                                                            application
                                                                .applicant
                                                                .gender
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>
                                                        <strong>
                                                            Education:
                                                        </strong>{" "}
                                                        {
                                                            application
                                                                .applicant
                                                                .education
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Work Experience:
                                                        </strong>{" "}
                                                        {
                                                            application
                                                                .applicant
                                                                .work_experience
                                                        }
                                                    </p>
                                                    <p>
                                                        <strong>CV:</strong>{" "}
                                                        {application.applicant
                                                            .curriculum_vitae && (
                                                            <a
                                                                href={getFullURL(
                                                                    application
                                                                        .applicant
                                                                        .curriculum_vitae,
                                                                )}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                View CV
                                                            </a>
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Portfolio:
                                                        </strong>{" "}
                                                        {application.applicant
                                                            .portfolio && (
                                                            <a
                                                                href={getFullURL(
                                                                    application
                                                                        .applicant
                                                                        .portfolio,
                                                                )}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                View Portfolio
                                                            </a>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
            {/* Delete Modal */}
            <Modal show={openModal} onClose={closeModal}>
                <form onSubmit={changeStatus} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">
                        Are you sure you want to change the status into{" "}
                        {data.status} ?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-500"></p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Change Status
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
import { useDropzone } from "react-dropzone";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";
import { toast } from "sonner";
export default function UploadContractForm(props) {
    const { application } = props;
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            employment_contract: application.employment_contract || null,
        });

    const [filePreview, setFilePreview] = useState(null);

    const getFullURL = (path) => {
        if (path.startsWith("http") || path.startsWith("https")) {
            return path;
        }
        return `${window.location.origin}${path}`;
    };

    useEffect(() => {
        if (
            data.employment_contract &&
            typeof data.employment_contract === "string"
        ) {
            const fullUrl = getFullURL(data.employment_contract);
            setFilePreview(fullUrl);
        }
    }, [data.employment_contract]);

    const onDrop = (acceptedFiles) => {
        if (
            acceptedFiles.length &&
            acceptedFiles[0].type === "application/pdf"
        ) {
            const file = acceptedFiles[0];
            setData("employment_contract", file);
            const fileURL = URL.createObjectURL(file);
            setFilePreview(fileURL);
        } else {
            toast.error("Please upload a valid PDF file.");
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    // submit form
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        post(route("application.upload-contract", props), {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <section className="mt-4">
            <form onSubmit={submit}>
                <InputLabel
                    className="block  text-md text-gray-700 dark:text-gray-300"
                    htmlFor="employment_contract"
                    value="Employment Contract"
                />
                {filePreview || data.employment_contract ? (
                    <div>
                        {/* Conditional message when a file is dropped */}
                        {data.employment_contract ===
                        application.employment_contract ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                No changes made, Click View Document to see your
                                Employment Contract.
                            </p>
                        ) : data.employment_contract ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                File imported, click upload to save.
                            </p>
                        ) : null}

                        {/* View Document Button */}
                        <div className="">
                            <SecondaryButton
                                className="mt-2 me-2"
                                onClick={() => {
                                    if (filePreview) {
                                        window.open(filePreview, "_blank");
                                    } else {
                                        toast.error(
                                            "No document available to view.",
                                        );
                                    }
                                }}
                            >
                                View Document
                            </SecondaryButton>

                            {application.status === "offered" && (
                                <SecondaryButton
                                    className="mt-2"
                                    onClick={() => {
                                        setData("employment_contract", null);
                                        setFilePreview(null);
                                    }}
                                >
                                    Change PDF
                                </SecondaryButton>
                            )}
                        </div>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={`h-[200px] flex items-center justify-center mt-1 p-4 border-2 border-dashed ${isDragActive ? "border-blue-500" : "border-gray-300"} rounded-md`}
                    >
                        <input {...getInputProps()} className="" />
                        {isDragActive ? (
                            <p className="text-lg dark:text-gray-200">
                                Drop the file here...
                            </p>
                        ) : (
                            <p className="text-lg dark:text-gray-200">
                                Drag and drop a PDF file, or click to select one
                            </p>
                        )}
                    </div>
                )}

                <InputError
                    message={errors.employment_contract}
                    className="mt-2"
                />

                <div className="flex items-center gap-4 mt-4">
                    {
                        // If the user is not hired, show the upload button
                        application.status === "offered" && (
                            <PrimaryButton disabled={processing}>
                                Upload
                            </PrimaryButton>
                        )
                    }

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

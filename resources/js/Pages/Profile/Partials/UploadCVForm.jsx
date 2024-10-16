import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";

export default function UploadCVForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        curriculum_vitae: user.curriculum_vitae || null,
    });

    //using react-dropzone
    const [filePreview, setFilePreview] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const getFullURL = (path) => {
        if (path.startsWith('http') || path.startsWith('https')) {
            return path;
        }
        return `${window.location.origin}${path}`;
    };

    useEffect(() => {
        if (data.curriculum_vitae && typeof data.curriculum_vitae === 'string') {
            const fullUrl = getFullURL(data.curriculum_vitae);
            setFilePreview(fullUrl);
        }
    }, [data.curriculum_vitae]);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length && acceptedFiles[0].type === 'application/pdf') {
            const file = acceptedFiles[0];
            setData('curriculum_vitae', file);
            const fileURL = URL.createObjectURL(file);
            setFilePreview(fileURL);
        } else {
            toast.error('Please upload a valid PDF file.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'application/pdf',
    });

    // submit form
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        post(route('profile.cv.store'), {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
            onError: (errors) => {
                toast.error('Error updating CV.');
                console.log(errors);
            },
        });
    };

    // Handle page changes
    const handleNextPage = () => {
        try {
            setPageNumber((prev) => prev + 1);
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handlePreviousPage = () => {
        setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <section className={className}>
            <form onSubmit={submit}>
                <InputLabel htmlFor="curriculum_vitae" value="Curriculum Vitae" />

                {filePreview || data.curriculum_vitae ? (
                    <div className="mt-2">
                        <iframe
                            src={`${filePreview}#toolbar=0&page=${pageNumber}`}
                            className="w-full h-[500px] border border-gray-300 rounded-md"
                            title="PDF Preview"
                        />
                        <div className="mt-4 flex justify-between">
                            <SecondaryButton onClick={handlePreviousPage} disabled={pageNumber === 1}>
                                Previous Page
                            </SecondaryButton>
                            <SecondaryButton onClick={handleNextPage} >
                                Next Page
                            </SecondaryButton>
                        </div>
                        <PrimaryButton className="mt-4" onClick={() => {
                            setData('curriculum_vitae', null);
                            setFilePreview(null);
                        }}>
                            Change PDF
                        </PrimaryButton>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={`h-[200px] flex items-center justify-center mt-1 p-4 border-2 border-dashed ${isDragActive ? 'border-blue-500' : 'border-gray-300'} rounded-md`}
                    >
                        <input {...getInputProps()} className="" />
                        {isDragActive ? (
                            <p className="text-lg dark:text-gray-200">Drop the file here...</p>
                        ) : (
                            <p className="text-lg dark:text-gray-200">Drag and drop a PDF file, or click to select one</p>
                        )}
                    </div>
                )}

                <InputError message={errors.curriculum_vitae} className="mt-2" />

                <div className="flex items-center gap-4 mt-4">
                    <PrimaryButton disabled={processing}>Upload</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

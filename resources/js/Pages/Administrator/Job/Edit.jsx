import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectBox from '@/Components/SelectBox';
import { useState } from 'react';

export default function Edit({ administrator, job }) {
    const [requirementInput, setRequirementInput] = useState('');
    const [responsibilityInput, setResponsibilityInput] = useState('');

    const { data, setData, put, errors, processing, reset } = useForm({
        job_type_id: job.job_type_id,
        job_name: job.job_name,
        min_rate_salary: job.min_rate_salary,
        max_rate_salary: job.max_rate_salary,
        min_experience: job.min_experience,
        job_desc: job.job_desc,
        job_place: job.job_place,
        requirement: JSON.parse(job.requirement),
        responsibilities: JSON.parse(job.responsibilities),
        date_listed: job.date_listed,
        date_expired: job.date_expired,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('jobs.update', job));

    };

    // Add requirement to the array
    const addRequirement = () => {
        if (requirementInput.trim()) {
            setData('requirement', [...data.requirement, requirementInput]);
            setRequirementInput('');
        }
    };

    // Add responsibility to the array
    const addResponsibility = () => {
        if (responsibilityInput.trim()) {
            setData('responsibilities', [...data.responsibilities, responsibilityInput]);
            setResponsibilityInput('');
        }
    };

    return (
        <AdministratorLayout
            user={administrator.user}
        >
            <Head title="Update Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-700 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <div className="mb-4">
                                    {/* Back button */}
                                    <Link href={route('jobs.index')} className="px-2 py-2  rounded-md bg-rose-700 text-white hover:text-slate-900 hover:bg-slate-200 hover:shadow-lg">
                                        {/* use svg arrow */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back
                                    </Link>
                                </div>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-200">Update Jobs</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-slate-200">
                                    Update job data.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                {/* Job Name */}
                                <div>
                                    <InputLabel htmlFor="job_name" value="Job Name" />
                                    <TextInput
                                        id="job_name"
                                        className="mt-1 block w-full"
                                        value={data.job_name}
                                        onChange={(e) => setData('job_name', e.target.value)}
                                        isFocused
                                        autoComplete="job_name"
                                    />
                                    <InputError className="mt-2" message={errors.job_name} />
                                </div>

                                {/* Job Type */}
                                <div>
                                    <InputLabel htmlFor="job_type_id" value="Job Type" />
                                    <SelectBox
                                        id="job_type_id"
                                        currentValue={data.job_type_id}
                                        onChange={(e) => setData('job_type_id', e.target.value)}
                                        options={[
                                            { value: '1', label: 'Full-time On-Site' },
                                            { value: '2', label: 'Full-time Hybrid' },
                                            { value: '3', label: 'Full-time Remote' },
                                            { value: '4', label: 'Internship On-Site' },
                                            { value: '5', label: 'Internship Hybrid' },
                                            { value: '6', label: 'Internship Remote' },
                                        ]}
                                    />
                                    <InputError className="mt-2" message={errors.job_type_id} />
                                </div>

                                {/* Minimum Rate Salary */}
                                <div>
                                    <InputLabel htmlFor="min_rate_salary" value="Minimum Rate Salary" />
                                    <TextInput
                                        id="min_rate_salary"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.min_rate_salary}
                                        onChange={(e) => setData('min_rate_salary', e.target.value)}
                                        autoComplete="min_rate_salary"
                                    />
                                    <InputError className="mt-2" message={errors.min_rate_salary} />
                                </div>

                                {/* Maximum Rate Salary */}
                                <div>
                                    <InputLabel htmlFor="max_rate_salary" value="Maximum Rate Salary" />
                                    <TextInput
                                        id="max_rate_salary"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.max_rate_salary}
                                        onChange={(e) => setData('max_rate_salary', e.target.value)}
                                        autoComplete="max_rate_salary"
                                    />
                                    <InputError className="mt-2" message={errors.max_rate_salary} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="job_desc" value="Job Description" />

                                    <textarea
                                        type="textarea"
                                        id="job_desc"
                                        className="mt-1 block w-full bg-slate-900 text-slate-300"
                                        value={data.job_desc}
                                        onChange={(e) => setData('job_desc', e.target.value)}
                                        autoComplete="job_desc"
                                    />

                                    <InputError className="mt-2" message={errors.job_desc} />
                                </div>
                                {/* job place */}
                                <div>
                                    <InputLabel htmlFor="job_place" value="Job Place" />
                                    <TextInput
                                        id="job_place"
                                        className="mt-1 block w-full"
                                        value={data.job_place}
                                        onChange={(e) => setData('job_place', e.target.value)}
                                        autoComplete="job_place"
                                    />
                                    <InputError className="mt-2" message={errors.job_place} />
                                </div>
                                {/* Array input for Requirements */}
                                <div>
                                    <InputLabel htmlFor="requirement" value="Requirement" />
                                    <div className="border-gray-500 border rounded-md my-1" >
                                        {data.requirement.length > 0 ? <ul className="px-4 ps-8 list-disc text-slate-200">
                                            {(data.requirement).map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul> : (
                                            <div className="text-slate-200 px-2 py-1">No requirements</div>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <TextInput
                                            id="requirement"
                                            className="block w-full"
                                            value={requirementInput}
                                            placeholder="Type new requirement here"
                                            onChange={(e) => setRequirementInput(e.target.value)}
                                            autoComplete="requirement"
                                        />
                                        <PrimaryButton type="button" className="ml-2" onClick={addRequirement}>
                                            Add
                                        </PrimaryButton>
                                    </div>

                                    <InputError className="mt-2" message={errors.requirement} />

                                </div>

                                {/* Array input for Responsibilities */}
                                <div>
                                    <InputLabel htmlFor="responsibility" value="Responsibility" />
                                    <div className="border-gray-500 border rounded-md my-1" >
                                        {data.responsibilities.length > 0 ? <ul className="px-4 ps-8 list-disc text-slate-200">
                                            {(data.responsibilities).map((res, index) => (
                                                <li key={index}>{res}</li>
                                            ))}
                                        </ul> : (
                                            <div className="text-slate-200 px-2 py-1">No responsibilities</div>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <TextInput
                                            id="responsibility"
                                            className="block w-full"
                                            value={responsibilityInput}
                                            placeholder="Type new responsibility here"
                                            onChange={(e) => setResponsibilityInput(e.target.value)}
                                            autoComplete="responsibility"
                                        />
                                        <PrimaryButton type="button" className="ml-2" onClick={addResponsibility}>
                                            Add
                                        </PrimaryButton>
                                    </div>

                                    <InputError className="mt-2" message={errors.responsibilities} />
                                </div>

                                {/* Date Listed */}
                                <div>
                                    <InputLabel htmlFor="date_listed" value="Date Listed" />
                                    <TextInput
                                        id="date_listed"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.date_listed}
                                        onChange={(e) => setData('date_listed', e.target.value)}
                                        autoComplete="date_listed"
                                    />
                                    <InputError className="mt-2" message={errors.date_listed} />
                                </div>

                                {/* Date Expired */}
                                <div>
                                    <InputLabel htmlFor="date_expired" value="Date Expired" />
                                    <TextInput
                                        id="date_expired"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.date_expired}
                                        onChange={(e) => setData('date_expired', e.target.value)}
                                        autoComplete="date_expired"
                                    />
                                    <InputError className="mt-2" message={errors.date_expired} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AdministratorLayout >
    );
}

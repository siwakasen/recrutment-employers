import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function TableJob({ jobs }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const { data, setData, delete: destroy, processing, reset } = useForm({});

    const confirmUserDeletion = (job) => {
        setData(job);
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('jobs.destroy', data), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const formatToRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0, // adjust as needed
            maximumFractionDigits: 0 // adjust as needed
        }).format(amount);
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    };
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Job Name
                            </th>
                            <th className="px-8 py-3 border-b w-32 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Job Type
                            </th>
                            <th className="px-6 py-3 border-b text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Min. Rate Salary
                            </th>
                            <th className="px-6 py-3 border-b text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Max. Rate Salary
                            </th>
                            <th className="px-6 py-3 border-b text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Min. Experience
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Job Description
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Job Place
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Requirement
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Responsibilities
                            </th>
                            <th className="px-6 py-3 border-b text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Date Listed
                            </th>
                            <th className="px-6 py-3 border-b text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                Date Expired
                            </th>
                            <th className="px-6 py-3 border-b text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                                &nbsp;
                            </th>
                        </tr>
                    </thead>
                    <tbody className=" bg-white dark:bg-gray-800 divide-y divide-gray-200">
                        {jobs.data && jobs.data.map((job, index) => (
                            <tr key={job.job_id} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}>
                                <td className="align-top px-6 py-4  whitespace-no-wrap text-sm text-gray-900 dark:text-slate-300">
                                    {job.job_name}
                                </td>
                                <td className="align-top px-8 py-4 whitespace-no-wrap text-sm text-gray-900 dark:text-slate-300">
                                    {job.job_type.job_type_name}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-right text-gray-900 dark:text-slate-300">
                                    {formatToRupiah(job.min_rate_salary)}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-right text-gray-900 dark:text-slate-300">
                                    {formatToRupiah(job.max_rate_salary)}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-right text-gray-900 dark:text-slate-300">
                                    {job.min_experience} years
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-gray-900 dark:text-slate-300">
                                    {job.job_desc}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-gray-900 dark:text-slate-300">
                                    {job.job_place}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-gray-900 dark:text-slate-300">
                                    <ul className="list-disc pl-5">
                                        {
                                            typeof job.requirement === 'string'
                                                ? JSON.parse(job.requirement).map((req, index) => (
                                                    <li key={index}>{req}</li>
                                                ))
                                                : <li>No requirements provided</li>
                                        }
                                    </ul>
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-gray-900 dark:text-slate-300">
                                    <ul className="list-disc pl-5">
                                        {
                                            typeof job.responsibilities === 'string'
                                                ? JSON.parse(job.responsibilities).map((res, index) => (
                                                    <li key={index}>{res}</li>
                                                ))
                                                : <li>No responsibilities provided</li>
                                        }
                                    </ul>
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-right text-gray-900 dark:text-slate-300">
                                    {formatDate(job.date_listed)}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-right text-gray-900 dark:text-slate-300">
                                    {formatDate(job.date_expired)}
                                </td>
                                <td className="align-top px-6 py-4 whitespace-no-wrap text-sm text-right text-gray-900 dark:text-slate-300">
                                    <div className="flex gap-2">
                                        <Link href={route('jobs.edit', job)} className="px-2 py-1 rounded-md bg-gray-800 text-white hover:text-slate-900 hover:bg-slate-200 hover:shadow-lg">Edit</Link>
                                        <button onClick={() => confirmUserDeletion(job)} className=" disabled:bg-slate-400 disabled:shadow-none px-2 py-1 rounded-md bg-red-700 dark:bg-rose-700 hover:dark:bg-rose-500 text-white  hover:bg-red-500 hover:shadow-lg">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-400">
                        Are you sure you want to delete this account?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    )
}

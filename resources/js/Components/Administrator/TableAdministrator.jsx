import { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function TableAdministrator({ users }) {

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
    } = useForm({});
    const confirmUserDeletion = (user) => {
        setData(user);
        setConfirmingUserDeletion(true);
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };
    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('users.destroy', data), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    return (
        <>
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50  dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50  dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50  dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50  dark:bg-gray-700 text-left text-xs leading-4 font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">
                            Role
                        </th>

                    </tr>
                </thead>
                <tbody className='dark:bg-gray-800'>
                    {users.data.map((user) => (
                        <tr key={user.admin_id} >
                            <td className="px-6 py-4 whitespace-no-wrap dark:bg-slate-700 ">
                                <div className="text-sm leading-5 text-gray-900  dark:text-slate-300">{user.admin_name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap dark:bg-slate-700 ">
                                <div className="text-sm leading-5 text-gray-900 dark:text-slate-300">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap dark:bg-slate-700 ">
                                <div className="text-sm leading-5 text-gray-900 dark:text-slate-300">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap dark:bg-slate-700 ">
                                <div className="text-sm leading-5 text-gray-900 dark:text-slate-300">{user.role.role_name}</div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="flex gap-2">
                                    <Link href={route('users.edit', user)} className="px-2 py-1 rounded-md bg-gray-800 text-white hover:text-slate-900 hover:bg-slate-200 hover:shadow-lg">Edit</Link>
                                    <button disabled={user.role == 'admin' ? true : false} onClick={() => confirmUserDeletion(user)} className=" disabled:bg-slate-400 disabled:shadow-none px-2 py-1 rounded-md bg-red-700 text-white  hover:bg-red-500 hover:shadow-lg">Delete</button>
                                </div>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
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

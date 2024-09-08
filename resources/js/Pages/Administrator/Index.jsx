import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import TableAdministrator from '@/Components/Administrator/TableAdministrator';
export default function AdminIndex({ administrator, administrators }) {

    return (
        <AdministratorLayout
            user={administrator.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Administrators</h2>}
        >
            <Head title="Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='p-2 flex'>
                        <label className='text-lg font-semibold dark:text-slate-200'>Total Administrators : {administrators.total}</label>
                        <Link href={route('administrator.create')} className='ml-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'>
                            Create Admin
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                        </div>
                        <TableAdministrator users={administrators} />
                        <Pagination links={administrators.links} />
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}

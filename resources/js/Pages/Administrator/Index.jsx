import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import TableAdministrator from '@/Components/Administrator/TableAdministrator';
import { useState, useEffect, useRef } from 'react';

export default function AdminIndex({ administrator, administrators, search }) {
    const isFirstRender = useRef(true);
    const [searchInput, setSearchInput] = useState(search || ''); // Initialize with search value if it exists
    console.log(administrators);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.visit(route('administrator.search'), {
                method: 'get',
                data: { search: searchInput },
                only: ['administrators'], // Update only the administrators
                preserveState: true, // Keep the state (pagination, etc.) while updating
                preserveScroll: true, // Keep the scroll position
                replace: true, // Replace the URL so the back button works properly
            });
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchInput, router]);

    return (
        <AdministratorLayout
            user={administrator.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Administrators</h2>}
        >
            <Head title="Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <label className="p-2 text-lg font-semibold dark:text-slate-200">Total Administrators: {administrators.data.length}</label>
                    <div className="p-2 flex">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search Admins"
                            className="border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <Link href={route('administrator.create')} className="ml-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                            Create Admin
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TableAdministrator users={administrators} />
                        <Pagination
                            links={administrators.links}
                            search={searchInput} // Pass the search value to Pagination
                        />
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}

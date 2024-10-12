import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
import TableJob from '@/Components/Job/TableJob';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { toastTypes } from '@/Constants/constants';

export default function JobIndex({ administrator, jobs, search, message }) {
    const isFirstRender = useRef(true);
    const [searchInput, setSearchInput] = useState(search || '');
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.visit(route('jobs.index'), {
                method: 'get',
                data: { search: searchInput },
                only: ['jobs'],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchInput, router]);

    useEffect(() => {
        if (message) {
            Object.keys(message).forEach(type => {
                if (toastTypes[type]) {
                    toastTypes[type](message[type]);
                }
            });
        }
    }, [message]);

    return (
        <AdministratorLayout
            user={administrator.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Jobs</h2>}
        >
            <Head title="Jobs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <label className="p-2 text-lg font-semibold dark:text-slate-200">Total Jobs: {jobs.total}</label>
                    <div className="p-2 flex">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search Jobs"
                            className="border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {
                            administrator.user.role.role_id === 1 ? (
                                <Link href={route('jobs.create')} className="ml-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                                    Create Jobs
                                </Link>
                            ) : <></>
                        }

                    </div>
                    <div className="overflow-auto dark:bg-gray-700 w-full shadow-sm sm:rounded-t-lg">
                        <TableJob jobs={jobs} />
                    </div>

                    <Pagination
                        links={jobs.links}
                        search={searchInput}
                    />
                </div>
            </div>
        </AdministratorLayout>
    );
}

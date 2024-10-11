import { Link, Head, router } from '@inertiajs/react';
import Homelayout from '@/Layouts/HomeLayout';
import { useState } from 'react';
import TableJob from '@/Components/Job/TableJob';
import PaginationCool from '@/Components/PaginationCool';

export default function Homepage({ auth, jobs }) {
    console.log(jobs);
    const [searchInput, setSearchInput] = useState("");
    const [jobCategory, setJobCategory] = useState("");
    const [company, setCompany] = useState("");

    const searchFunctionHandler = (e) => {
        e.preventDefault();
        // Implement your search request here
        router.visit(route('home.index'), {
            method: 'get',
            data: { search: searchInput },
            only: ['jobs'],
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Homepage" />
            <Homelayout user={""}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Search Form */}
                        <form onSubmit={searchFunctionHandler} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md my-2">
                            {/* Search Input */}
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search Job"
                                className="w-full px-4 py-2 border border-gray-300 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none focus:ring-0 dark:border-gray-700 focus:border-gray-800"
                            />

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-400"
                            >
                                <i className="fas fa-search"></i> Search
                            </button>
                        </form>
                        <PaginationCool links={jobs.links} from={jobs.from} to={jobs.to} total={jobs.total} data_length={jobs.data.length} />
                        {/* Table and Pagination */}
                        <TableJob jobs={jobs} />

                    </div>
                </div>
            </Homelayout>
        </>
    );
}

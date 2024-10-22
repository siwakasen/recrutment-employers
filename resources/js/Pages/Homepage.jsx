import { Link, Head, router, useForm } from '@inertiajs/react';
import Homelayout from '@/Layouts/HomeLayout';
import { useState, useEffect } from 'react';
import PaginationCool from '@/Components/PaginationCool';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Homepage({ auth, jobs, sentVerifMessage, canResetPassword }) {

    const { post, processing } = useForm({});
    const [searchInput, setSearchInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (sentVerifMessage) {
            setShowModal(true);
        }
    }, [sentVerifMessage]); 

    const searchFunctionHandler = (e) => {
        e.preventDefault();
        router.visit(route('home.index'), {
            method: 'get',
            data: { search: searchInput },
            only: ['jobs'],
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'), {
            onSuccess: () => {
                setStatus('verification-link-sent');
            }
        });

    };

    return (
        <>
            <Head title="Homepage" />
            <Homelayout user={auth.user ? auth.user : ""} canResetPassword={canResetPassword}>
                <img src="/images/rec_banners_2.jpg" alt="Banner" className="w-full max-h-[20rem] object-cover" />

                <div className="pb-12 sm:relative -top-8">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form onSubmit={searchFunctionHandler} className="flex items-center space-x-2 bg-white sm:dark:bg-gray-800 dark:bg-gray-900 px-5 py-7  sm:rounded-2xl shadow-lg sm:my-2">
                            {/* Search Input */}
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search Job"
                                className="w-full px-4 py-2 border border-gray-300 dark:bg-gray-700 dark:text-white rounded-full focus:outline-none focus:ring-0 dark:border-gray-700 focus:border-blue dark:focus:border-gray-800"
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

                        {/* Job List */}
                        <div className='px-4 sm:px-0'>
                            {
                                jobs.data.map((job, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-4 border border-gray-200 dark:border-none hover:shadow-lg transition-shadow">
                                        <Link href={route('jobs.detail', job)}>
                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold  dark:text-gray-300">{job.job_name}</span>
                                                <span className="text-gray-500 text-md dark:text-gray-300">
                                                    {job.job_type.job_type_name}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 dark:text-gray-300 mt-1 text-[16px]">Min. {job.min_experience} years exp.</p>
                                            <div className="flex items-center mt-2 text-gray-900 dark:text-gray-300 space-x-3">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-gray-900 dark:text-gray-300 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M9.5 2.75C6.65 2.75 4.375 5.025 4.375 7.875c0 3.637 4.25 7.96 4.25 7.96s4.25-4.323 4.25-7.96c0-2.85-2.275-5.125-5.125-5.125zm0 7.125a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" />
                                                    </svg>
                                                    <span>{job.job_place}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-300 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M10 2a8 8 0 00-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm1 11H9V9h2v4zm1.5-4H13v-2h-2v2z" />
                                                    </svg>
                                                    <span className='text-gray-400'>{dayjs(job.date_listed).fromNow()}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Modal that appears on first render */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                            <div className="mb-4 text-sm text-gray-400">
                                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                                link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                            </div>

                            {status === 'verification-link-sent' && (
                                <div className="mb-4 font-medium text-sm text-green-400">
                                    A new verification link has been sent to the email address you provided during registration.
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="mt-4 flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-600"
                                    >
                                        {processing ? 'Please wait . . .' : 'Resend Verification Email'}
                                    </button>

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="mt-4 px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}
            </Homelayout>
        </>
    );
}

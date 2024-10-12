import { Link, Head, router } from '@inertiajs/react';
import Homelayout from '@/Layouts/HomeLayout';
import { useState } from 'react';
import TableJob from '@/Components/Job/TableJob';
import PaginationCool from '@/Components/PaginationCool';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

export default function Jobdetail({ auth, job }) {

    return (
        <>
            <Head title={job.job_name} />
            <Homelayout user={auth.user ? auth.user : ""}>
                <div className="py-12 ">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className='grid grid-cols-1 sm:grid-cols-2  justify-between'>
                            <div className='flex mb-8 sm:mb-0 items-center gap-4'>
                                <h1 className='text-3xl  dark:text-white'>{job.job_name}</h1>
                                <button className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-400" >Apply Now</button>
                            </div>
                            <div className='bg-white sm:dark:bg-gray-800 dark:bg-gray-800 px-5 py-7  sm:rounded-lg shadow-lg my-2'>

                            </div>
                        </div>
                    </div>
                </div>
            </Homelayout>
        </>
    );
}

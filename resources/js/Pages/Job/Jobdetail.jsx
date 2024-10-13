import { Link, Head, router } from '@inertiajs/react';
import Homelayout from '@/Layouts/HomeLayout';
import { useState } from 'react';
import TableJob from '@/Components/Job/TableJob';
import PaginationCool from '@/Components/PaginationCool';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatToRupiah } from '@/Constants/constants';

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

export default function Jobdetail({ auth, job }) {
    console.log(job);
    return (
        <>
            <Head title={job.job_name} />
            <Homelayout user={auth.user ? auth.user : ""}>
                <img src="/images/rec_banners_2.jpg" alt="Banner" className="w-full max-h-[20rem] object-cover" />

                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className=''>
                            <div className='flex mb-8 sm:mb-0 gap-4 justify-between px-4 my-2'>
                                <h1 className='text-3xl  dark:text-white font-bold'>{job.job_name}</h1>
                            </div>
                            <div className='bg-white sm:dark:bg-gray-800 dark:bg-gray-800 px-5 py-7  sm:rounded-lg shadow-lg my-2'>
                                <div className='grid gap-2 sm:grid-cols-3'>
                                    <div>

                                        <div className="flex items-center dark:text-white">
                                            <svg className="w-5 h-5 text-gray-700  dark:text-gray-300 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.5 2.75C6.65 2.75 4.375 5.025 4.375 7.875c0 3.637 4.25 7.96 4.25 7.96s4.25-4.323 4.25-7.96c0-2.85-2.275-5.125-5.125-5.125zm0 7.125a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" />
                                            </svg>
                                            <span>{job.job_place}</span>
                                        </div>
                                        <div className="flex items-center dark:text-white">
                                            <svg className="w-5 h-5 text-gray-700  dark:text-gray-300 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 112 0v4a1 1 0 01-2 0V4zm1 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                            </svg>
                                            <span>{job.job_type.job_type_name}</span>
                                        </div>
                                    </div>
                                    <div>

                                        <div className="flex items-center dark:text-white">
                                            <svg className="w-5 h-5 text-gray-700  dark:text-gray-300 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 112 0v4a1 1 0 01-2 0V4zm1 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                            </svg>
                                            <span>Minimum {job.min_experience} years experience</span>
                                        </div>
                                        <div className="flex items-center dark:text-white">
                                            <svg className="w-5 h-5 text-gray-700  dark:text-gray-300 mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 112 0v4a1 1 0 01-2 0V4zm1 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                            </svg>
                                            <span>{formatToRupiah(job.min_rate_salary)} - {formatToRupiah(job.max_rate_salary)}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4 p-2'>
                                        <p className='text-gray-400'>{dayjs(job.date_listed).fromNow()} </p>
                                        <button className="bg-green-600 text-white px-2 py-2  hover:bg-green-700 focus:outline-none focus:ring-0 focus:ring-green-400" >Apply Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className='sm:p-5'>
                                <div className='mx-4 my-4 text-gray-700 dark:text-gray-300'>
                                    <h1 className='text-2xl mb-2 font-semibold'>Requirement</h1>
                                    <ul className="list-disc pl-5">
                                        {
                                            typeof job.requirement === 'string'
                                                ? JSON.parse(job.requirement).map((req, index) => (
                                                    <li key={index}>{req}</li>
                                                ))
                                                : <li>No requirements provided</li>
                                        }
                                    </ul>
                                </div>
                                <div className='mx-4 my-4 text-gray-700 dark:text-gray-300'>
                                    <h1 className='text-2xl mb-2 font-semibold'>Responsibilities</h1>
                                    <ul className="list-disc pl-5">
                                        {
                                            typeof job.responsibilities === 'string'
                                                ? JSON.parse(job.responsibilities).map((req, index) => (
                                                    <li key={index}>{req}</li>
                                                ))
                                                : <li>No responsibilitiess provided</li>
                                        }
                                    </ul>
                                </div>
                                <p className='mx-4 my-4 text-sm text-gray-500 dark:text-gray-400'>Expired {dayjs(job.date_expired).fromNow()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Homelayout>
        </>
    );
}

import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="bg-white dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-t dark:border-gray-900 border-gray-200 sm:px-6">
            <div className=" flex-1 flex items-center justify-end">
                <div>
                    <nav className="relative z-0 inline-flex shadow-sm ">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={
                                    link.active ?
                                        "bg-indigo-500 text-white relative inline-flex items-center px-4 py-2 border  text-sm leading-5 font-medium  rounded-sm hover:text-white focus:z-10 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-500 active:text-white transition ease-in-out duration-150" :
                                        "relative inline-flex items-center px-4 py-2 border border-slate-200 text-sm leading-5 font-medium rounded-sm text-gray-700 dark:text-slate-300 hover:text-white hover:bg-indigo-500 focus:z-10 focus:outline-none focus:border-indigo-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            >
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

import { Link, router } from '@inertiajs/react';

export default function PaginationCool({ links, search, from, to, total, data_length }) {
    return (
        <div className="bg-transparent dark:bg-gray-900 px-4 py-1 flex items-center justify-between  dark:border-gray-900 border-gray-200 w-full">
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing
                        {
                            to !== total ? (
                                <span className="font-medium"> {from} to {to} of {total} list</span>
                            ) : (
                                <span className="font-medium"> the last {data_length} of {total} list </span>
                            )
                        }

                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex">
                        {/* Previous Icon */}
                        <button
                            onClick={() => router.visit(links[0]?.url)}
                            disabled={!links[0]?.url}
                            className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 px-2 py-1 rounded-full disabled:hover:cursor-not-allowed"
                        >
                            &lt;
                        </button>

                        {/* Page Numbers */}
                        {links.map((link, index) => (
                            index !== 0 && index !== links.length - 1 && (
                                <Link
                                    key={index}
                                    href={link.url && search ? `${link.url}&search=${search}` : link.url}
                                    className={
                                        link.active
                                            ? "bg-white dark:bg-gray-500 text-white-600 dark:text-white font-bold rounded-full border border-white dark:border-none px-3 py-1 focus:outline-none focus:ring-2   focus:ring-gray-500"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    }
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}

                        <button
                            onClick={() => router.visit(links[links.length - 1]?.url)}
                            disabled={!links[links.length - 1]?.url}
                            className='text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 px-2 py-1 rounded-full disabled:hover:cursor-not-allowed'
                        >
                            &gt;
                        </button>
                    </nav>
                </div>
            </div>
        </div >
    );
}

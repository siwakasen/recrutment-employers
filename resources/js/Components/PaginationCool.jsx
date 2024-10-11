import { Link, } from '@inertiajs/react';

export default function PaginationCool({ links, search, from, to, total, data_length }) {
    return (
        <div className="bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-t dark:border-gray-900 border-gray-200 w-full">
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
                    <nav className="relative z-0 inline-flex shadow-sm space-x-1">
                        {/* Previous Icon */}
                        <Link
                            href={links[0].url}
                            className="text-gray-500 px-2 py-1 rounded-full"
                        >
                            <span className="sr-only">Previous</span>
                            &lt; {/* You can replace this with an icon */}
                        </Link>

                        {/* Page Numbers */}
                        {links.map((link, index) => (
                            index !== 0 && index !== links.length - 1 && (
                                <Link
                                    key={index}
                                    href={link.url && search ? `${link.url}&search=${search}` : link.url}
                                    className={
                                        link.active
                                            ? "bg-white dark:bg-gray-500 text-white-600 dark:text-white font-bold rounded-full border border-white px-3 py-1 focus:outline-none focus:ring-2   focus:ring-blue-500"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    }
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}

                        {/* Next Icon */}
                        <Link
                            href={links[links.length - 1].url}
                            disabled={!links[links.length - 1].url}
                            className="text-gray-500  px-2 py-1 rounded-full"
                        >
                            <span className="sr-only">Next</span>
                            &gt; {/* You can replace this with an icon */}
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}

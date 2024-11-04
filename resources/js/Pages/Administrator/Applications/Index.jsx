import AdministratorLayout from "@/Layouts/Administrator/AdministratorLayout";
import { Head, usePage, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import TableJob from "@/Components/Job/TableJob";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { toastTypes } from "@/Constants/constants";
import TableApplications from "@/Components/Applications/TableApplications";

export default function ApplicationIndex({
    administrator,
    applications,
    search,
    message,
}) {
    const isFirstRender = useRef(true);
    const [searchInput, setSearchInput] = useState(search || "");
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.visit(route("applications.index"), {
                method: "get",
                data: { search: searchInput },
                only: ["applications"],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchInput, router]);

    useEffect(() => {
        if (message) {
            Object.keys(message).forEach((type) => {
                if (toastTypes[type]) {
                    toastTypes[type](message[type]);
                }
            });
        }
    }, [message]);

    return (
        <AdministratorLayout
            user={administrator.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Applications
                </h2>
            }
        >
            <Head title="Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <label className="p-2 text-lg font-semibold dark:text-slate-200">
                        Total Applications: {applications.total}
                    </label>
                    <div className="p-2 grid grid-cols-2">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search..."
                            className="p-2 border border-gray-300 dark:border-slate-600 rounded-md flex-1"
                        />
                    </div>
                    <div className="overflow-auto dark:bg-gray-700 w-full shadow-sm sm:rounded-t-lg">
                        <TableApplications
                            applications={applications.data}
                            role_id={administrator.user.role_id}
                        />
                    </div>
                    <Pagination links={applications.links} />
                </div>
            </div>
        </AdministratorLayout>
    );
}

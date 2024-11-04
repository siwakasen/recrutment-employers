import { toast } from 'sonner';
export const userMenu = () =>{
    return [
        {
            name: 'Dashboard',
            href: route('home.index'),
            current: route().current('home.index') || route().current('home.search') || route().current('jobs.detail'),
        },
        {
            name: 'Applied',
            href: route('applications.show'),
            current: route().current('applications.show'),
        }
    ];
}

export const menu = (role_id) => {
    if (role_id === 1) {
        return [
            {
                name: 'Dashboard',
                href: route('administrator.dashboard'),
                current: route().current('administrator.dashboard'),
            },
            {
                name: 'Jobs',
                href: route('jobs.index'),
                current: route().current('jobs.index') || route().current('jobs.search') || route().current('jobs.create') || route().current('jobs.edit'),
            },
            {
                name: 'Applications',
                href: route('applications.index'),
                current: route().current('applications.index') || route().current('applications.search'),
            }
        ]
    } else {
        return [
            {
                name: 'Dashboard',
                href: route('administrator.dashboard'),
                current: route().current('administrator.dashboard'),
            },
            {
                name: 'Admin',
                href: route('administrator.index'),
                current: route().current('administrator.index') || route().current('administrator.search') || route().current('administrator.create') || route().current('administrator.edit'),
            },
            {
                name: 'Jobs',
                href: route('jobs.index'),
                current: route().current('jobs.index'),
            },
            {
                name: 'Applications',
                href: route('applications.index'),
                current: route().current('applications.index') || route().current('applications.search'),
            }
        ]
    }
}

export const formatToRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
};

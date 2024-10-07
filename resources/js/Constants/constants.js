import { toast } from 'sonner';

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
                current: route().current('administrator.index') || route().current('administrator.search') || route().current('administrator.create'),
            },
            {
                name: 'Jobs',
                href: route('jobs.index'),
                current: route().current('jobs.index'),
            },
        ]
    }
}

export const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
};

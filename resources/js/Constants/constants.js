export const menu = (role_id) => {
    if (role_id === 1) {
        return [
            {
                name: 'Dashboard',
                href: route('administrator.dashboard'),
                current: route().current('administrator.dashboard'),
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
                current: route().current('administrator.index'),
            },
        ]
    }
}

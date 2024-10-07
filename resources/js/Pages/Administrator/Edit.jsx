import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectBox from '@/Components/SelectBox';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function Edit({ administrator, admin_to_edit }) {
    const { data, setData, patch, errors, processing, reset } = useForm({
        admin_name: admin_to_edit.admin_name,
        email: admin_to_edit.email,
        role_id: admin_to_edit.role_id,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('administrator.update', admin_to_edit));
    };

    return (
        <AdministratorLayout
            user={administrator.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Administrator</h2>}
        >
            <Head title="Create Administrator" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-700 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-200">Update Administrator</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-slate-200">
                                    Update data administrator.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="admin_name" value="Administrator Name" />

                                    <TextInput
                                        id="admin_name"
                                        className="mt-1 block w-full"
                                        value={data.admin_name}
                                        onChange={(e) => setData('admin_name', e.target.value)}
                                        isFocused
                                        autoComplete="admin_name"
                                    />

                                    <InputError className="mt-2" message={errors.admin_name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="username"
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="role_id" value="Role" />

                                    <SelectBox
                                        id="role_id"
                                        currentValue={data.role_id}
                                        onChange={(e) => setData('role_id', e.target.value)}

                                        options={[
                                            { value: '1', label: 'HR' },
                                            { value: '2', label: 'Executive' },
                                        ]}
                                    />

                                    <InputError className="mt-2" message={errors.role_id} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}

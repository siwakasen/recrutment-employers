import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectBox from '@/Components/SelectBox';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Create({ administrator }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        admin_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '1',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('administrator.store'));
    };

    return (
        <AdministratorLayout
            user={administrator.user}
        // header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Administrator</h2>}
        >
            <Head title="Create Administrator" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-slate-700 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-200">Create Administrator</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-slate-200">
                                    Create a new administrator.
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

                                <div>
                                    <InputLabel htmlFor="password" value="New Password" />

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            type={showPassword ? 'text' : 'password'}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                    <div className="relative">
                                        <TextInput
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            type={showPasswordConfirmation ? 'text' : 'password'}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        >
                                            {showPasswordConfirmation ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>

                                    <InputError message={errors.password_confirmation} className="mt-2" />
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

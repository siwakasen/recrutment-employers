import AdministratorLayout from '@/Layouts/Administrator/AdministratorLayout';
import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Password({ administrator }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, patch, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        patch(route('administrator.password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <AdministratorLayout
            user={administrator.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Change Password</h2>}
        >
            <Head title="Change Password" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <section >
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Ensure your account is using a long, random password to stay secure.
                                </p>
                            </header>

                            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="current_password" value="Current Password" />

                                    <TextInput
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                    />

                                    <InputError message={errors.current_password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="New Password" />

                                    <TextInput
                                        id="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                    <TextInput
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        type="password"
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>

                </div>
            </div>

        </AdministratorLayout>
    );
}

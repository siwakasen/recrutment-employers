
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';

export default function Register({ setIsOnLoginModal, closeModal }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        applicant_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
            onSuccess: () => {
                closeModal();
            }
        });
    };

    return (
        <div className="w-full  mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg ">
            <div className='text-2xl font-bold mb-2 dark:text-gray-100 flex justify-center'>Register</div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="applicant_name" value="Applicant Name" />

                    <TextInput
                        id="applicant_name"
                        name="applicant_name"
                        value={data.applicant_name}
                        className="mt-1 block w-full"
                        autoComplete="applicant_name"
                        isFocused={true}
                        onChange={(e) => setData('applicant_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.applicant_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-end justify-end flex-col mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                    <div className='mt-2'>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Have an account? </span>
                        <button
                            onClick={() => setIsOnLoginModal(true)}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Login
                        </button>
                    </div>

                </div>

            </form>
        </div>
    );
}

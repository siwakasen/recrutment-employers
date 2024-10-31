import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { Transition } from "@headlessui/react";
export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            applicant_name: user.applicant_name,
            email: user.email,
            address: user.address || "",
            phone: user.phone || "",
            portfolio: user.portfolio || "",
            gender: user.gender || "",
            education: user.education || "",
            work_experience: user.work_experience || "",
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            onError: (errors) => {
                toast.error("Error updating profile.");
                console.log(errors);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="applicant_name" value="Name" />

                    <TextInput
                        id="applicant_name"
                        className="mt-1 block w-full"
                        value={data.applicant_name}
                        onChange={(e) =>
                            setData("applicant_name", e.target.value)
                        }
                        required
                        isFocused
                        autoComplete="applicant_name"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.applicant_name}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm ps-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <InputLabel htmlFor="gender" value="Gender" />

                    <select
                        id="gender"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600"
                        value={data.gender}
                        onChange={(e) => setData("gender", e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="man">Male</option>
                        <option value="woman">Female</option>
                    </select>

                    <InputError className="mt-2" message={errors.gender} />
                </div>
                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        placeholder="Example: Jl. Jend. Sudirman No. 1"
                        onChange={(e) => setData("address", e.target.value)}
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        placeholder="Example: 081234567890"
                        onChange={(e) => setData("phone", e.target.value)}
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    {/* portfolio link */}
                    <InputLabel htmlFor="portfolio" value="Portfolio Link" />

                    <TextInput
                        id="portfolio"
                        className="mt-1 block w-full"
                        value={data.portfolio}
                        onChange={(e) => setData("portfolio", e.target.value)}
                        autoComplete="portfolio"
                    />

                    <InputError className="mt-2" message={errors.portfolio} />
                </div>
                <div>
                    <InputLabel
                        htmlFor="work_experience"
                        value="Work Experience (in year)"
                    />
                    <TextInput
                        id="work_experience"
                        type="number"
                        className="mt-1 block w-full"
                        placeholder="Example: 1"
                        value={data.work_experience}
                        onChange={(e) =>
                            setData("work_experience", e.target.value)
                        }
                        autoComplete="work_experience"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.work_experience}
                    />
                </div>

                {/* education (enum) */}
                <div>
                    <InputLabel htmlFor="education" value="Education" />

                    <select
                        id="education"
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600"
                        value={data.education}
                        onChange={(e) => setData("education", e.target.value)}
                    >
                        <option value="">-Change-</option>
                        <option value="senior high school">
                            Senior High School
                        </option>
                        <option value="vocational school">
                            Vocational School
                        </option>
                        <option value="bachelor degree">Bachelor Degree</option>
                        <option value="post graduate">Post Graduate</option>
                        <option value="master degree">Master Degree</option>
                    </select>

                    <InputError className="mt-2" message={errors.education} />
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

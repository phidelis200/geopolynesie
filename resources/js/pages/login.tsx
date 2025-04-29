import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import Provider from '@/provider';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion - Géopolynésie" />
            <Provider>
                <div className="flex min-h-screen flex-col">
                    <AuthLayout
                        title="Connectez-vous à votre compte"
                        description="Entrez votre email et votre mot de passe ci-dessous pour vous connecter"
                    >
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Adresse email</Label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        className="focus:ring-ocean-500 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Mot de passe"
                                        className="focus:ring-ocean-500 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                        className="focus:ring-ocean-500 border border-gray-300 text-gray-700 focus:ring-2 focus:outline-none"
                                    />
                                    <Label htmlFor="remember">Souvenez-vous de moi</Label>
                                </div>

                                <button type="submit" className="btn-ocean mt-4 w-full cursor-pointer md:w-auto" tabIndex={4} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Se connecter
                                </button>
                            </div>
                        </form>

                        {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                    </AuthLayout>
                </div>
            </Provider>
        </>
    );
}

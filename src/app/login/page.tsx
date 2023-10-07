"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LoginPage = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setErrors([]);

        const responseNextAuth = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (responseNextAuth?.error) {
            setErrors(responseNextAuth.error.split(","));
            return;
        }

        router.push("perfil");
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-600 w-screen h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="justify-center">Ingresar</h1>
                    <input
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        type="texto"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <br />
                    <input
                        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                            invalid:border-pink-500 invalid:text-pink-600
                                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                        type="password"
                        placeholder="*******"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <br />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ... active:bg-blue-600 ..."
                    >
                        Enviar
                    </button>
                </form>
                {errors.length > 0 && (
                    <div>
                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage
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
            <div>

                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="texto"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="*******"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <br/>
                    <button
                        type="submit"
                    >
                        Login
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
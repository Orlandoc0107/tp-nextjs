"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registrarUsuario } from "../api/user/registro";

interface ErrorMessages {
    [key: string]: string[];
  }
  

const RegisterPage = () => {
    const [username, setUsername] = useState<string>("");
    const [first_name, setFirst_name] = useState<string>("");
    const [last_name, setLast_name] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const [errors, setErrors] = useState<ErrorMessages>({});
    const [serverResponse, setServerResponse] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);
  

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = await registrarUsuario({
            username,
            first_name,
            last_name,
            email,
            password,
        });

        if (result.response.message) {
            // Mostrar el mensaje del backend en una alerta
            window.alert(result.response.message);
            router.push("/");
          } else {
            const errorMessages: ErrorMessages = result.response;
      
            // Mostrar los mensajes de error en el DOM
            setErrors(errorMessages);
            // Incrementa el contador de intentos
            setAttempts(attempts + 1);
          }
      
          // Si el usuario ha intentado tres veces sin éxito, redirige al home
          if (attempts >= 3) {
            router.push("/");
          }
        };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="first_name"
                    name="first_name"
                    value={first_name}
                    onChange={(event) => setFirst_name(event.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="last_name"
                    name="last_name"
                    value={last_name}
                    onChange={(event) => setLast_name(event.target.value)}
                />
                <br />
                <input
                    type="email"
                    placeholder="correo@correo.com"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="******"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <button type="submit">Registrar</button>
            </form>
            {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map((errorList, index) => (
              errorList.map((error, innerIndex) => (
                <li key={index + "-" + innerIndex}>{error}</li>
              ))
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default RegisterPage;

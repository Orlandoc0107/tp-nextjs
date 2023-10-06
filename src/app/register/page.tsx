"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registrarUsuario } from "../api/user/registro";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <Header />
      <div className="bg-gray-600 w-screen h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="justify-center">Registrar</h1>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                  invalid:border-pink-500 invalid:text-pink-600
                                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="text"
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
            type="text"
            placeholder="first_name"
            name="first_name"
            value={first_name}
            onChange={(event) => setFirst_name(event.target.value)}
          />
          <br />
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="text"
            placeholder="last_name"
            name="last_name"
            value={last_name}
            onChange={(event) => setLast_name(event.target.value)}
          />
          <br />
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="email"
            placeholder="correo@correo.com"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="password"
            placeholder="******"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button type="submit"
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded mx-2 my-2 border-double border-4 border-sky-500 ..."
          >Enviar</button>
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
      <Footer />
    </div>
  );
};


export default RegisterPage;

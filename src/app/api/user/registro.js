// api/registro.js
export async function registrarUsuario({
  username,
  first_name,
  last_name,
  email,
  password,
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/registro/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        first_name,
        last_name,
        email,
        password,
      }),
    }
  );

  const responseData = await response.json();
  return { response: responseData, formData: { username, first_name, last_name, email, password } };
}
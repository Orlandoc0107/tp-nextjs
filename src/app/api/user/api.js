// user/api.js

export const userDatos = {
  usuario: "",
  nombre: "",
  apellido: "",
  email: "",
};

export const getUserData = async (accessToken) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/datos/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await res.json();
    return { ...userDatos, ...data };
  } catch (error) {
    throw new Error("Error al obtener datos del usuario");
  }
};

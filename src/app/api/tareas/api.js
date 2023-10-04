

//crear Tarea POST
export async function crearTarea({
  titulo,
  descripcion,
  user,
  token,
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/crear/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        user:1,
      }),
    }
  );

  const responseData = await response.json();
  return { response: responseData, formData: { titulo, descripcion, user } };
}


/// Mostrar todas las tareas


export async function mostrarTareas({
  token,
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/vertodo/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseData = await response.json();
  return { response: responseData };
}


/// Actualizar Tarea

export default async function ActualizarTarea({
  titulo,
  descripcion,
  user,
  token,
  tareaid
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/actualizar/${tareaid}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        user:1,
      }),
    }
  );

  const responseData = await response.json();
  return { response: responseData, formData: { titulo, descripcion, user } };
}


// tareas/api.js
const tareaData = {
  titulo: "",
  descripcion: "",
  creado: "",
  finalizado: "",
};

//tareas/crear/
export const crearTarea = async (accessToken, tareaData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}tareas/crear/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tareaData),
      }
    );

    if (!res.ok) {
      throw new Error("Error al crear la tarea");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error al crear la tarea");
  }
};

try {
    const resultado = await crearTarea(accessToken, tareaData);
    console.log("Tarea creada exitosamente:", resultado);
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
  }
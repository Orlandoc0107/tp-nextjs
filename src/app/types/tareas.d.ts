
// propiedades del Objeto tarea lo que vamos a recibir por peticion 
// Task
export interface Form_Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    creado: string;
    finalizado: boolean;
    user: number;
}

/// propiedades Necesarias para crear una Tarea 
// CreateTaskData

export interface CrearTareaDato {
    titulo: string;
    descripcion: string;
    user: number;
}
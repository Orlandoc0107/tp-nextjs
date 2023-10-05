import React from 'react'

export default function page({ params }: { params: any }) {
  return (
    <div>
      <h1>Modificar Tareas</h1>
      <h2>{params.id}</h2>
    </div>
  )
}

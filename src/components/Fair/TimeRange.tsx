"use client"
import { useFair } from '@/context/FairProvider'
import React, { useState } from 'react'


function TimeRange() {
    const { fair, setTimeSelect } = useFair();

    const [horariosCupos, setHorariosCupos] = useState([
        { horario: '10:00 - 10:30', cuposDisponibles: 10 },
        { horario: '10:30 - 11:00', cuposDisponibles: 10 },
        { horario: '11:00 - 11:30', cuposDisponibles: 0 },
        { horario: '11:30 - 12:00', cuposDisponibles: 10 },
    ])

    const [mostrarRangos, setMostrarRangos] = useState(false)
    const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('')

    const handleInputClick = () => {
        setMostrarRangos(true)
    }

    const handleHorarioClick = (horario: string, cuposDisponibles: number) => {
        if (cuposDisponibles > 0) {
            setHorarioSeleccionado(horario)
            setMostrarRangos(false)
            setTimeSelect(horario)
        }
    }

    return (
      <div className='flex flex-col mt-5'>
        <label className='font-bold'>Horario</label>
        <input
          type="text"
          placeholder="Selecciona horario"
          value={horarioSeleccionado}
          onClick={handleInputClick}
          readOnly
          style={{ cursor: "pointer" }}
          className="placeholder:text-primary-dark placeholder:p-2 w-fit p-2 border border-secondary-default rounded-md shadow-sm cursor-pointer "
        />
        {mostrarRangos && (
          <div>
            {horariosCupos.map((hc, index) => (
              <div
                key={index}
                onClick={() =>
                  handleHorarioClick(hc.horario, hc.cuposDisponibles)
                }
                style={{
                  cursor: hc.cuposDisponibles > 0 ? "pointer" : "not-allowed",
                  opacity: hc.cuposDisponibles === 0 ? 0.5 : 1,
                }}
              >
                <p>
                  {hc.horario} {hc.cuposDisponibles === 0 ? "Agotado" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}


export default TimeRange
import { useForm } from "react-hook-form";
import MessageErrors from "./MessageErrors";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";

export default function PatientForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DraftPatient>();

  const { addPatient, updatePatiend } = usePatientStore();
  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);


  useEffect(() => {
    if (activeId) {
      const activepatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];
      setValue("name", activepatient.name);
      setValue("caretaker", activepatient.caretaker);
      setValue("date", activepatient.date);
      setValue("symptoms", activepatient.symptoms);
      setValue("email", activepatient.email);
    }

    return () => {};
  }, [activeId]);

  const registerPatient = (data: DraftPatient) => {
    if(activeId === ''){
      addPatient(data);
      toast.success('Paciente Registrado Correctamente')
    }else{
      updatePatiend(data)
      toast.info('Pacientes actulizado Correctamente!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }

    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5 ">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El Nombre del paciente es obligatorio",
            })}
          />
          {errors.name && <MessageErrors>{errors.name?.message}</MessageErrors>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El Propietario es obligatorio",
            })}
          />

          {errors.caretaker && (
            <MessageErrors>{errors.caretaker?.message}</MessageErrors>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />

          {errors.email && (
            <MessageErrors>{errors.email?.message}</MessageErrors>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            placeholder="Nombre del Propietario"
            {...register("date", {
              required: "La fecha es obligatorio",
            })}
          />
          {errors.date && <MessageErrors>{errors.date?.message}</MessageErrors>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            {...register("symptoms", {
              required: "Los Sintomas son obligatorios",
            })}
          />
          {errors.symptoms && (
            <MessageErrors>{errors.symptoms?.message}</MessageErrors>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={activeId === '' ?"Guardar Paciente" : "Actualizar Paciente "}
        />
      </form>
    </div>
  );
}

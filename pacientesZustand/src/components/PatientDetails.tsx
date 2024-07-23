import { Bounce, toast } from "react-toastify"
import { usePatientStore } from "../store/store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatientDetailsProps = {
    patient: Patient
}


function PatientDetails({patient }: PatientDetailsProps) {

    const deletePatient =  usePatientStore((state)=> state.deletePatient)
    const getPatientById =  usePatientStore((state)=> state.getPatientById)
    const handleDelete = () =>{
        deletePatient(patient.id)
        toast.error('Paciente Eliminado!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
            });
    }

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetailItem label='ID:' value={patient.id}/>

        <PatientDetailItem label="Nombre:" value={patient.name}/>

        <PatientDetailItem label="Propietario:" value={patient.caretaker}/>

        <PatientDetailItem label="Email:" value={patient.email}/>

        <PatientDetailItem label="Fecha Alta:" value={patient.date.toString()}/>

        <PatientDetailItem label="Sintomas:" value={patient.symptoms}/>


        <div className="flex gap-4  flex-col  md:flex-row mt-10">
            <button onClick={() => getPatientById(patient.id)} type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">
                Editar
            </button>
            <button onClick={ handleDelete} type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg">
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default PatientDetails
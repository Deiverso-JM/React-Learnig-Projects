import ProjectForm from "@/components/project/ProjectForm";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

function CreateProjectView() {
  const navigate = useNavigate();
  const initialvalues: ProjectFormData = {
    clientName: "",
    description: "",
    projectName: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialvalues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (dataResponse) => {
      toast.success(dataResponse, {
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "top-right",
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/");
    },
  });

  const handleForm = (data: ProjectFormData) => mutate(data);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyectos
        </p>

        <nav className="my-5">
          <Link
            to={"/"}
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors "
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={"Crear Proyecto"}
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700  cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}

export default CreateProjectView;

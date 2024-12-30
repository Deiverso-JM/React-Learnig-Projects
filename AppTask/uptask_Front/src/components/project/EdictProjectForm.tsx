import ProjectForm from "@/components/project/ProjectForm";
import { toast, ToastOptions } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProjectFormData } from "@/types/index";
import { updateProject } from "@/api/ProjectAPI";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toasSuccesFormat } from "@/utils/utils";

function EditProjectForm({ projectFound }: { projectFound: ProjectFormData }) {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.ProjectId!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clientName: projectFound.clientName,
      description: projectFound.description,
      projectName: projectFound.projectName,
    },
  });

  const queryCliente = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataResponse) => {
      queryCliente.invalidateQueries({ queryKey: ["projects"] });
      queryCliente.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(dataResponse, toasSuccesFormat as ToastOptions);
      navigate("/");
    },
  });

  const handleForm = (data: ProjectFormData) => {
    const dataFill = {
      projectId,
      data,
    };
    mutate(dataFill);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para actualizar un proyecto
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
            value={"Actualizar Proyecto"}
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700  cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}

export default EditProjectForm;

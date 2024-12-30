import { NoteFormData } from "@/types/index";
import { toasSuccesFormat } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastOptions } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import { createNote } from "@/api/NoteApi";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
  const params = useParams();
  const projectId = params.ProjectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTaskId")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataResponse) => {
      toast.success(dataResponse, toasSuccesFormat as ToastOptions);
      queryClient.invalidateQueries({ queryKey: ["taskId", taskId] });
      reset();
    },
  });
  const onSubmit = (formData: NoteFormData) => {
    const dataForm = {
      formData,
      projectId,
      taskId,
    };

    mutateAsync(dataForm);
  };
  return (
    <form onSubmit={() => {}} className="space-y-3" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Nota
        </label>
        <input
          id="content "
          type="text"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Crear Nota"
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
}

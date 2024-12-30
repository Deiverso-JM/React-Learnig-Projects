import { TaskFormData } from "@/types/index";
import TaskForm from "./TaskForm";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TaskApi";
import { toast, ToastOptions } from "react-toastify";
import { toasSuccesFormat } from "@/utils/utils";

export default function AddTaskModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryLocation = new URLSearchParams(location.search);
  const modalTask = queryLocation.get("newTask");
  const show = modalTask ? true : false;
  const params = useParams();
  const projectId = params.ProjectId!;
  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });
  const queryCliente = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataResponse) => {
      queryCliente.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(dataResponse, toasSuccesFormat as ToastOptions);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleSubmitTask =  async (formData: TaskFormData) => {
    const dataFull = {
      formData,
      projectId,
    };
    mutateAsync(dataFull);
  };
 
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate(location.pathname, { replace: true });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form
                    className="mt-10 space-y-3"
                    noValidate
                    onSubmit={handleSubmit(handleSubmitTask)}
                  >
                    <TaskForm errors={errors} register={register} />
                    <input
                      type="submit"
                      value={"Crear Tarea"}
                      className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700  cursor-pointer transition-colors"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

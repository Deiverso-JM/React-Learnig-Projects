import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTaskStatus } from "@/api/TaskApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { formatData } from "@/utils/utils";
import { statusTranslations } from "@/locales/es";
import { TaskStatus } from "@/types/index";

export default function TaskModalDetails() {
  const params = useParams();
  const projectId = params.ProjectId!;

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTaskId")!;

  const show = taskId ? true : false;

  const { data, isError, error } = useQuery({
    queryKey: ["taskId", taskId],
    queryFn: () =>
      getTaskById({
        projectId,
        taskId: taskId,
      }),
    enabled: !!taskId,
    retry: false,
  });

  const queryCliente = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      queryCliente.invalidateQueries({queryKey: ['editProject', projectId]})
      queryCliente.invalidateQueries({queryKey: ['taskId', taskId]})

      toast.success(data);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus;
    const dataUpdate = {
      taskId,
      projectId,
      status,
    };
    mutate(dataUpdate);
    navigate(location.pathname, { replace: true });

  };

  useEffect(() => {
    if (isError) {
      toast.error(error.message, { toastId: "error" });
      navigate(`/projects/${projectId}`, { replace: true });
    }
  }, [isError, error, navigate, projectId]);

  if (isError) return null;

  if (data)
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
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatData(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatData(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-slate-600 my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-slate-500 mb-2">
                      Descripción: {data.description}
                    </p>
                    <div className="my-5 space-y-3">
                      <label className="font-bold">Estado Actual:</label>
                      <select
                        className="w-full p-3 bg-white border border-gray-300 "
                        defaultValue={data.status}
                        onChange={handleChange}
                      >
                        {Object.entries(statusTranslations).map(
                          ([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}

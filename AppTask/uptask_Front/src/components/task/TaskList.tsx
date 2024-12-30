import { Project, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import {
  initialStatusGrouops,
  statusborderColor,
  statusTranslations,
} from "@/locales/es";
import DropTask from "./DropTask";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { updateTaskStatus } from "@/api/TaskApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams();
  const projectId = params.ProjectId!;
  const queryCliente = useQueryClient();

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGrouops);

  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: (data) => {
      queryCliente.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if ((over?.id, active)) {
      const status = over?.id as TaskStatus;
      const taskId = active.id.toString();

      const dataUpdate = {
        projectId,
        status,
        taskId,
      };
      mutate(dataUpdate);
      queryCliente.setQueryData(
        ["editProject", projectId],
        (prevData: Project) => {
          const updateTask = prevData.tasks?.map((task) => {
            if (task._id === taskId) {
              return {
                ...task,
                status,
              };
            }
            return task;
          });
          return {
            ...prevData,
            tasks: updateTask,
          };
        }
      );
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-semibold border border-slate-300 bg-white p-3 border-t-8 ${statusborderColor[status]}`}
              >
                {statusTranslations[status]}
              </h3>
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks?.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}

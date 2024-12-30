import { getFullProyect } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/task/AddTaskModal";
import EditTaskData from "@/components/task/EditTaskData";
import TaskList from "@/components/task/TaskList";
import TaskModalDetails from "@/components/task/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/polices";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
  const params = useParams();
  const projectId = params.ProjectId!;
  const navigate = useNavigate();

  const { data: user, isLoading: authLoanding } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getFullProyect(projectId),
    retry: false,
  });
  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoanding) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;

  if (data && user)
    return (
      <>
        <h1 className=" text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              onClick={() => navigate("?newTask=true")}
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Agregar Tarea
            </button>

            <Link
              to={"team"}
              className="bg-fuchsia-400  hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />

        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}

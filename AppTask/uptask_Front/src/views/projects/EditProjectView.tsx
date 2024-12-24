import { getProyectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/project/EdictProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export function EditProjectView() {
  const params = useParams();
  const projectId = params.ProjectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProyectById(projectId),
    retry: false,
  });

  if (isLoading) return "Cargando...";

  if (isError) return <Navigate to={"/404"} />;

  if (data) return <EditProjectForm projectFound={data} />;
}

import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  //Param ProjecId
  const params = useParams();
  const projectId = params.ProjectId!;

  // Location TaskID
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editTaskId = queryParams.get("EditTaskId")!;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["taskId", editTaskId],
    queryFn: () =>
      getTaskById({
        projectId,
        taskId: editTaskId,
      }),
    enabled: !!editTaskId,
  });
  
  if (isLoading) {
    return <div>Loading...</div>; 
  }
  
  if (isError) {
    return <div>Error: {error.message}</div>; 
  }
  
  if (data) {
    return <EditTaskModal task={data} editTaskId={editTaskId} />;
  }
  
  return <div>No data available</div>;
  
}

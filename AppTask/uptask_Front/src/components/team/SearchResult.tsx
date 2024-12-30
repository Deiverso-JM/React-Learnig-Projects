import { Project, TeamMember } from "@/types/index";
import { addUserTeam } from "@/api/TeamApi";
import { toasSuccesFormat } from "@/utils/utils";
import { toast, ToastOptions } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SearchResult({
  mutationData,
  projectId,
  resetData,
}: {
  mutationData: TeamMember;
  projectId: Project["_id"];
  resetData: () => void;
}) {
  const queryClient = useQueryClient()


  const { mutateAsync } = useMutation({
    mutationFn: addUserTeam,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataResponse) => {
      toast.success(dataResponse, toasSuccesFormat as ToastOptions);
      resetData()
      queryClient.invalidateQueries({queryKey: ['projectTeam']})
      
    },
  });

  const handleAddUserTeam = () => {
    const dataFull = {
      id: mutationData._id,
      projectId,
    };
    mutateAsync(dataFull);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between p-5 items-center">
        <p className=" font-bold ">{mutationData.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserTeam}
        >
          Agregar el Proyecto
        </button>
      </div>
    </>
  );
}

import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatData, toasSuccesFormat } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();

  const canDelete = useMemo(
    () => data?._id === note.createdBy._id,
    [data?._id, note.createdBy._id]
  );
  const params = useParams();
  const projectId = params.ProjectId!;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTaskId")!;

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataResponse) => {
      toast.success(dataResponse, toasSuccesFormat as ToastOptions);
      queryClient.invalidateQueries({ queryKey: ["taskId", taskId] });
    },
  });
  if (isLoading) return "Cargando...";
  return (
    <div className="p-3 flex justify-between ">
      <div>
        <p className="font-semibold mb-1">
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500 ">{formatData(note.createdAt)}</p>
      </div>

      <div>
        {canDelete && (
          <button
            type="button"
            className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
            onClick={() => mutateAsync({ projectId, taskId, noteId: note._id })}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

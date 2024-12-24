import { Task } from "../types";

type GroupTask = {
    [key: string]: Task[];
};



export const initialStatusGrouops: GroupTask = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
};

export const statusTranslations: { [key: string]: string } = {
    pending: "Pendiente",
    onHold: "En Espera",
    inProgress: "En Progreso",
    underReview: "En Revision",
    completed: "Completado",
};
export const statusborderColor: { [key: string]: string } = {
    pending: "border-t-slate-500",
    onHold: "border-t-red-500",
    inProgress: "border-t-blue-500",
    underReview: "border-t-amber-500",
    completed: "border-t-emerald-500",
};
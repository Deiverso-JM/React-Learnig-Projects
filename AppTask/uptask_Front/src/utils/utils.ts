import { Bounce } from "react-toastify"

export function formatData(isoString: string): string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)
}
export const toasSuccesFormat = {
    autoClose: 5000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: false,
    pauseOnHover: true,
    position: "top-right",
    progress: undefined,
    theme: "light",
    transition: Bounce,
}
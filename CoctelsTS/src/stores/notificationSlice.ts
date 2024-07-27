import { StateCreator } from "zustand"
import { FavoritiesSliceType } from "./favoritesSlice"

type Notification = {
  text: string
  error: boolean
  show: boolean
}


export type NotificationSliceType = {
  notification: Notification,
  showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
  closewNotification: () => void
}

export const createNotificationSlice  : StateCreator<NotificationSliceType & FavoritiesSliceType, [], [], NotificationSliceType> =(set,get) => ({
    notification: {
      text: '',
      error: false,
      show: false,
    },
    showNotification: (payload) => {
      set({
        notification:{
          text: payload.text,
          error: payload.error,
          show: true
        }
      })

      setTimeout(() => {
        get().closewNotification()
      }, 2000);
    },
    closewNotification: () => {
      set({
        notification:{
          text: '',
          error: false,
          show: false
        }
      })
    }

})
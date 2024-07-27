import { create } from "zustand";
import { createRecipesSlice, RecipesSlicesType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoritiesSlice, FavoritiesSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";


export const useAppStores = create<RecipesSlicesType & FavoritiesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritiesSlice(...a),
    ...createNotificationSlice(...a)
})))



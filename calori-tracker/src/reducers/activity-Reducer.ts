import type { Activity } from "../types";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activitiId"; payload: { id: Activity["id"] } }
  | { type: "delete-activitiId"; payload: { id: Activity["id"] } }
  | { type: "restar-app" };

export type ActivityState = {
  activities: Activity[];
  activitiId: Activity["id"];
  actionState: string
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activitiId: "",
  actionState: ''
};




export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState  => {
  if (action.type === "save-activity") {
    //Este codigo maneja logica
    let updateActivities: Activity[] = [];
    if (state.activitiId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activitiId ? action.payload.newActivity : activity
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updateActivities,
      activitiId: "",
    };
  }

  if (action.type === "set-activitiId") {
    return {
      ...state,
      activitiId: action.payload.id,
      actionState: action.type
    };
  }

  if (action.type === "delete-activitiId") {
    
    return {
      ...state,
      activities: state.activities.filter(
        (item) => item.id !== action.payload.id
      ),
      activitiId: '',
      actionState: action.type

      
    };
  }

  
  if(action.type === 'restar-app'){
    return{
      activities:[],
      activitiId: "",
      actionState: ''
    }
  }

  return state;
};

import { createContext, Dispatch, ReactNode, useMemo, useReducer, useState } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activity-Reducer";
import { Activity } from "../types";



type ActivityCaloryProvideProps = {
  children: ReactNode;
};


type ActivityCaloryProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  CaloriesConsumed: number
  CaloriesBurned: number
  caloriesTotal: number

};


export const ActivityCaloryContext = createContext<ActivityCaloryProps>(null!);





export const ActivityProvider = ({ children }: ActivityCaloryProvideProps) => {
  
  const [state,dispatch] = useReducer(activityReducer,initialState)

  //Contadores
  const CaloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity )  =>
          activity.category === 1 ? total + +activity.calorias : total,
        0
      ),
    [state.activities]
  );
  
  const CaloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + +activity.calorias : total,
        0
      ),
    [state.activities]
  );
  
  const caloriesTotal = useMemo(()=> CaloriesConsumed - CaloriesBurned , [state.activities])




  return (
    <ActivityCaloryContext.Provider
      value={{
        state,
        dispatch,
        CaloriesConsumed,
        caloriesTotal,
        CaloriesBurned
      }}
    >
      {children}
    </ActivityCaloryContext.Provider>
  );
};

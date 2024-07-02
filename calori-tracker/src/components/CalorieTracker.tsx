import { useMemo } from "react";
import { Activity } from "../types";
import CaloryDisplay from "./CaloryDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

function CalorieTracker({ activities }: CalorieTrackerProps) {
  //Contadores
  const CaloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + +activity.calorias : total,
        0
      ),
    [activities]
  );

  const CaloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + +activity.calorias : total,
        0
      ),
    [activities]
  );

  const caloriesTotal = useMemo(()=> CaloriesConsumed - CaloriesBurned , [activities])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">

        <CaloryDisplay
            caloriesCalculate={CaloriesConsumed}
            type={"Consumidos"}
        />

        <CaloryDisplay
            caloriesCalculate={CaloriesBurned}
            type={"Ejericicios"}
        />
        <CaloryDisplay 
            caloriesCalculate={caloriesTotal}
            type={"Total calorias"}
        />

      </div>
    </>
  );
}

export default CalorieTracker;

import CaloryDisplay from "./CaloryDisplay";
import useCalory from "../hooks/useCalory";



function CalorieTracker() {

  const { caloriesTotal, CaloriesConsumed, CaloriesBurned} = useCalory()

  


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

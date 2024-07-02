
type CaloryDisplayProps ={
    caloriesCalculate: number,
    type: string
}

function CaloryDisplay({caloriesCalculate, type}: CaloryDisplayProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3  text-center">
          
    <span className=" font-black text-6xl text-orange-500">
    {caloriesCalculate}
  </span>
  {type}
  </p>
  )
}

export default CaloryDisplay
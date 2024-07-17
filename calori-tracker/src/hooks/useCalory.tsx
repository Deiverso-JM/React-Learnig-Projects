import { useContext } from "react"
import { ActivityCaloryContext } from "../context/ActivityContext"

function useCalory() {
  
  const context = useContext(ActivityCaloryContext)
  if(!context){
    throw new Error('No existe un contexto que utilize activityCaloryContext')
  }
  
  return context 
}

export default useCalory
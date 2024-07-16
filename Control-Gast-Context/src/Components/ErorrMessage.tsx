import  { PropsWithChildren} from "react"


function ErorrMessage({children} : PropsWithChildren) {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center"> 
        {children}
    </p>
  )
}

export default ErorrMessage
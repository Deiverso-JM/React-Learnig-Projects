import { useEffect } from "react";
import Form from "./components/Form";
import { useCryptoStrore } from "./context/Store";
import DisplayPrices from "./components/DisplayPrices";
import Loader from "./components/Loader";

function App() {
  const fetchCryptos = useCryptoStrore((state) => state.fetchCryptos)
  const loaderState = useCryptoStrore((state) => state.Loading)
  
  useEffect(() =>{
    fetchCryptos()
  }, [])
  
  return (


    
    <div className="container">
      <h1 className="app-title">
        Cotizador de <span>Criptomenadas</span>
      </h1>

      <div className="content">
        <h2>CriptoSearchForm</h2>

        <Form/>
        {loaderState ? <Loader/> :  <DisplayPrices/>}
      </div>
      
    </div>




    
  )
}

export default App;

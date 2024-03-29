// eslint-disable-next-line no-unused-vars
import "../src/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";


function App() {

  const {
    removeFromCart,
    incrementarCart, 
    decrementarCart,
    addToCart, 
    cart, 
    data, 
    cleanCart,
    isEmpity,
    calcularTotal
  } = useCart()

  return (
    <>
      <Header
      removeFromCart={removeFromCart}
      cart={cart} 
      incrementarCart={incrementarCart}
      decrementarCart={decrementarCart}
      cleanCart={cleanCart}
      isEmpity={isEmpity}
      calcularTotal={calcularTotal}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((data) => {
            return (
              <Guitar
                key={data.id}
                data={data}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../src/index.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Guitar from "../src/components/Guitar";
import { db } from "../src/data/db";


function App() {


  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  // eslint-disable-next-line no-unused-vars
  const [data, setData ] = useState(db)
  const [cart, setCart] = useState(initialCart)
  


  
    function addToCart(data) {
  
      const dataExist = cart.findIndex((item => item.id === data.id))
      if(dataExist >= 0){
        const updateCard = [...cart];
        updateCard[dataExist].quantity++;
        setCart(updateCard)
      }else{
        data.quantity = 1
        setCart(prevCart => [...prevCart, data]);
      }
      
    }

    function removeFromCart(id){
      setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }


    function incrementarCart(id){
      const updateCart = cart.map(item => {
        if(item.id === id && item.quantity <5){
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }

        return item
      })

      setCart(updateCart)
    } 

    
    function decrementarCart(id){
      const updateCart = cart.map(item => {
        if(item.id === id && item.quantity >0){
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }

        return item
      })

      setCart(updateCart)
    }


    
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])


  return (
    <>
      <Header
      removeFromCart={removeFromCart}
      cart={cart} 
      incrementarCart={incrementarCart}
      decrementarCart={decrementarCart}
      setCart = {setCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((data) => {
            return (
              <Guitar
                key={data.id}
                data={data}
                setCart={setCart}
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

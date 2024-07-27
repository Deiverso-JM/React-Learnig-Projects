import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/ModalRecipe";
import { useEffect } from "react";
import { useAppStores } from "../stores/useAppStore";
import Notification from "../components/Notification";

export default function Layout() {
  const loadFromStorage = useAppStores((state) => state.loadFromStorage)


  useEffect(() => {
    loadFromStorage()
  },[])
  return (
    <>
      <Header />
      
      <main className="container mx-auto py-16">

      <Outlet />
      </main>

      <Modal/>
      <Notification/>
    </>
  );
}

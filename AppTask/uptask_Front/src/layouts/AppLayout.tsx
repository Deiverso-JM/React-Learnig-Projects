import 'react-toastify/ReactToastify.css'
import Logo from "@/components/Logo";
import { Link, Outlet } from "react-router-dom";
import { NavMenu } from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64 ">
                <Link to={'/'}>
                  <Logo/>
                </Link>
            </div>

            <NavMenu/>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5 ">

      <Outlet />
      </section>
      
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear ()}
        </p> 
        
      </footer>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />

    </>
  );
}

export default AppLayout;

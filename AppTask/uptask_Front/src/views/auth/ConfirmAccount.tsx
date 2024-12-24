import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { confirmToken } from "@/api/AuthApi";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>();

  const handleChange = (token: string) => setToken(token);

  const { mutateAsync } = useMutation({
    mutationFn: confirmToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (dataResponse) => {
      toast.success(dataResponse, {
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: "top-right",
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    },
  });

  const handleComplete = (token: string) => {
    mutateAsync(token)
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg  border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/new-code"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
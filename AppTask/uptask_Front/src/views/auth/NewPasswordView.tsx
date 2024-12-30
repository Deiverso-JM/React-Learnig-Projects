import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { ConfirmToken } from "@/types/index";
import { useState } from "react";

function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibiste {""}
        <span className="text-fuchsia-500 font-bold">por email</span>
      </p>

      {isValidToken ? (
        <NewPasswordForm  
          token={token} 
        />
      ) : (
        <NewPasswordToken 
          setIsValidToken={setIsValidToken}
          setToken={setToken}
          token={token} 
        />
      )}
    </>
  );
}

export default NewPasswordView;
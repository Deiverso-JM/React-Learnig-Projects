import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { UserLoginForm } from "@/types/index";
import { toast, ToastOptions } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestLogin } from "@/api/AuthApi";
import { toasSuccesFormat } from "@/utils/utils";

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutateAsync } = useMutation({
    mutationFn: requestLogin,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Iniciando sesion', toasSuccesFormat as ToastOptions );
      navigate('/')
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutateAsync(formData);

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/register"}
        >
          No tienes cuenta, crear una
        </Link>
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/new-password"}
        >
          Olvidaste tu password, recuperala aqui
        </Link>
      </nav>
    </>
  );
}

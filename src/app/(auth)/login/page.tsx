import { Metadata } from "next";
import { LoginOptions } from "./options";

export const metadata: Metadata = {
  title: "Login | Bookly",
  description: "Pagina de login",
};

export default function Login() {
  return (
    <>
      <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center bg-background-200">
          <div className="h-auto w-3/5 space-y-6">
            <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
              Bookly
            </h1>
            <h2 className="text-title text-2xl font-bold">
              Entre na sua conta
            </h2>
            <p className="font-thin text-slate-500">
              Bem-vindo de volta! Por favor, escolha o método de login
            </p>

            <LoginOptions />
          </div>
        </div>
      </div>
    </>
  );
}

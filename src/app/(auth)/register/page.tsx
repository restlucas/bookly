"use client";

import { SelectInput } from "@/components/input/select";
import { TextInput } from "@/components/input/text";
import { usersType } from "@/utils/common-data";
import { GithubLogo, GoogleLogo, LinkedinLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="flex items-center justify-center bg-background-200">
        <div className="h-auto w-3/5 space-y-4">
          <h1 className="my-4 text-3xl font-bold text-vibrant-green-100">
            Bookly
          </h1>
          <h2 className="text-title text-2xl font-bold">Registrar-se</h2>
          <SelectInput
            label="Vou utilizar o sistema como"
            options={usersType}
          />
          <p className="font-thin text-slate-500">
            Escolha um método de registro!
          </p>

          <div className="grid w-full grid-cols-2 gap-2">
            <button
              onClick={() => signIn("google", { callbackUrl: "/register" })}
              className="text-title flex items-center justify-center gap-2 rounded-xl border-2 border-background-300 py-4 duration-150 hover:border-vibrant-green-200 hover:bg-background-100"
            >
              <GoogleLogo color="#E34133" weight="fill" size={26} />
              <span>Google</span>
            </button>
            <button
              onClick={() => signIn("github")}
              className="text-title flex items-center justify-center gap-2 rounded-xl border-2 border-background-300 py-4 duration-150 hover:border-vibrant-green-200 hover:bg-background-100"
            >
              <GithubLogo color="#0A78B5" weight="duotone" size={26} />
              <span>Github</span>
            </button>
            <button
              onClick={() => signIn("linkedin")}
              className="text-title col-span-2 flex w-[calc(50%_-_0.5rem)] items-center justify-center gap-2 justify-self-center rounded-xl border-2 border-background-300 py-4 duration-150 hover:border-vibrant-green-200 hover:bg-background-100"
            >
              <LinkedinLogo color="#0A78B5" weight="duotone" size={26} />
              <span>Linkedin</span>
            </button>
          </div>

          <div className="border-t-[1px] border-background-300" />

          <div className="flex items-center justify-center">
            <span className="text-slate-500">Já tem uma conta?</span>
            <Link
              href="/login"
              className="text-primary ml-1 hover:text-vibrant-green-100"
            >
              Faça login!
            </Link>
          </div>
        </div>
      </div>
      {/* <aside className="bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat" /> */}
    </div>
  );
}

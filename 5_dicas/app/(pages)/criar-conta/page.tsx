"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import api from "@/services/axios";
import InputField from "@/components/InputField";
import { useGame } from "@/context/GameContext";

export default function CriarConta() {
  const router = useRouter();
  const { setJogador } = useGame();

  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email inválido")
        .required("Email é obrigatório"),
      username: Yup.string()
        .min(3, "Mínimo de 3 caracteres")
        .required("Username é obrigatório"),
    }),

    onSubmit: async (values) => {
      setApiError("");

      try {
        const res = await api.post("/jogador", values);
        setJogador(res.data);
        router.push("/home");
      } catch (error: any) {
        if (error.response?.status === 409) {
          setApiError("Esse email já está sendo usado");
        } else {
          setApiError("Erro ao criar conta");
        }
      }
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Criar conta</h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          <InputField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.username}
            touched={formik.touched.username}
          />

          {apiError && (
            <div className="text-sm text-red-500 text-center">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-blue-600
                       hover:bg-blue-500 transition font-semibold"
          >
            Criar conta
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Já possui conta?{" "}
          <button
            onClick={() => router.push("/entrar")}
            className="text-blue-400 hover:underline"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}
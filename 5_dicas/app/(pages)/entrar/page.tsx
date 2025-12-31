"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

import api from "@/services/axios";
import InputField from "@/components/InputField";
import { useAuth } from "@/context/AuthContext";

export default function Entrar() {
  const router = useRouter();
  const { setUserById } = useAuth();

  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },

    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    }),

    onSubmit: async (values) => {
      setApiError("");

      try {
        const res = await api.get(`/jogador/email/${values.email}`);

        // 🔑 autentica corretamente
        await setUserById(res.data.id);

        router.push("/home");
      } catch (error: any) {
        if (error.response?.status === 404) {
          setApiError("Esse email não possui conta");
        } else {
          setApiError("Erro ao entrar");
        }
      }
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Entrar</h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <InputField {...formik.getFieldProps("email")} label="Email" type="email"
            error={formik.errors.email} touched={formik.touched.email} />

          {apiError && <p className="text-sm text-red-500 text-center">{apiError}</p>}

          <button type="submit"
            className="mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold">
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Não possui conta?{" "}
          <button onClick={() => router.push("/criar-conta")}
            className="text-blue-400 hover:underline">
            Criar conta
          </button>
        </div>
      </div>
    </main>
  );
}
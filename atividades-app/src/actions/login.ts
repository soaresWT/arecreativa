"use server";

import apiError from "../functions/api-error";
import { cookies } from "next/headers";
import { TOKEN_POST } from "../functions/api";

export default async function login(state: {}, formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  try {
    if (!email || !password) throw new Error("Preencha os dados.");
    const { url } = TOKEN_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Senha ou usuário inválidos.");
    const data = await response.json();
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}

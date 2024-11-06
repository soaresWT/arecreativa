"use server";
import { cookies } from "next/headers";
import { ACTIVITY_PUT } from "../functions/api";
import apiError from "../functions/api-error";

export default async function disableActivity(id: String) {
  try {
    const token = cookies().get("token");
    if (!token) {
      return { data: null, ok: false, error: "Token não encontrado." };
    }
    const { url } = ACTIVITY_PUT();
    const response = await fetch(`${url}/disable/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.value,
      },
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Erro ao desabilitar a atividade");
    }

    const data = await response.json();
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}

"use server";
import apiError from "../functions/api-error";
import { cookies } from "next/headers";
import { USER_GET } from "../functions/api";

export default async function fetchActivities() {
  try {
    const token = cookies().get("token");
    if (!token) {
      return { data: null, ok: false, error: "Token não encontrado." };
    }

    const { url } = USER_GET();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.value,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar as usuarios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return apiError(error);
  }
}

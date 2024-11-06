"use server";
import { cookies } from "next/headers";
import { ACTIVITY_GET } from "../functions/api";
const fetchActivityDetails = async (id: String) => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return { data: null, ok: false, error: "Token não encontrado." };
    }
    const { url } = ACTIVITY_GET();
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.value,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar os detalhes da atividade");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar os detalhes da atividade:", error);
    throw error;
  }
};

export default fetchActivityDetails;

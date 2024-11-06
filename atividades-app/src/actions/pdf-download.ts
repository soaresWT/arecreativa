"use server";
import { cookies } from "next/headers";
import { ACTIVITY_GET } from "../functions/api";
const pdfGET = async (id: String) => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return { data: null, ok: false, error: "Token não encontrado." };
    }
    const { url } = ACTIVITY_GET();
    return { data: { url, token: "Bearer " + token.value }, ok: true };
  } catch (error) {
    console.error("Erro ao buscar o pdf da atividade:", error);
    throw error;
  }
};

export default pdfGET;

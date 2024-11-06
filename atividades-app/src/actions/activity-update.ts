"use server";
import { cookies } from "next/headers";
import { ACTIVITY_PUT } from "../functions/api";
import apiError from "../functions/api-error";

export default async function updateActivity(id: string, formData: FormData) {
  const title = formData.get("title") as string | null;
  const summary = formData.get("summary") as string | null;
  const objectives = formData.get("objectives") as string | null;

  const bncc_skills_string = formData.get("bncc_skills") as string | null;
  let bncc_skills: string[] | null = null;

  if (bncc_skills_string) {
    try {
      bncc_skills = JSON.parse(bncc_skills_string);
      if (!Array.isArray(bncc_skills)) {
        throw new Error("bncc_skills não é um array válido.");
      }
    } catch (error) {
      throw new Error(
        "Erro ao converter bncc_skills para array: " + (error as Error).message
      );
    }
  }

  const total_time = formData.get("total_time") as string | null;
  const required_resources = formData.get("required_resources") as
    | string
    | null;
  const step_by_step_guide = formData.get("step_by_step_guide") as
    | string
    | null;
  const user_id = formData.get("user_id") as string | null;

  try {
    const token = cookies().get("token");
    if (!token) {
      return { data: null, ok: false, error: "Token não encontrado." };
    }

    const { url } = ACTIVITY_PUT();
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.value,
      },
      body: JSON.stringify({
        title,
        summary,
        objectives,
        bncc_skills,
        total_time,
        required_resources,
        step_by_step_guide,
        user_id,
      }),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar a atividade");
    }

    const data = await response.json();
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}

"use server";

import { ACTIVITY_POST } from "../functions/api";
import apiError from "../functions/api-error";
import { cookies } from "next/headers";

export default async function activityPost(state: {}, formData: FormData) {
  const token = cookies().get("token");
  if (!token) {
    return { data: null, ok: false, error: "Token não encontrado." };
  }
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
    console.log("token:");
    const { url } = ACTIVITY_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.value,
      },
      body: JSON.stringify({
        title,
        summary,
        objectives,
        bncc_skills_string,
        total_time,
        required_resources,
        step_by_step_guide,
        user_id,
      }),
    });
    console.log("resposta:", response);
    if (!response.ok) throw new Error("Erro ao cadastrar a atividade.");

    const data = await response.json();
    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}

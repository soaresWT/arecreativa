"use client";
import ActivityForm from "@/components/activityForm";
import fetchActivityDetails from "../../../actions/activity-get-details";
import updateActivity from "../../../actions/activity-update";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { message, Spin } from "antd";

export default function EditActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const activity = await fetchActivityDetails(id);
        setInitialValues(activity);
      } catch {
        message.error("Erro ao carregar os detalhes da atividade.");
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [id]);

  const handleUpdate = async (formData: any) => {
    try {
      const response = await updateActivity(id, formData);
      if (response.ok) {
        message.success("Atividade atualizada com sucesso!");
        router.push("/atividades/lista");
      } else {
        message.error("Erro ao atualizar atividade.");
      }
    } catch {
      message.error("Ocorreu um erro ao atualizar atividade.");
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <ActivityForm
      action="Atualizar"
      initialValues={initialValues}
      onSubmit={handleUpdate}
      showExportActivityButton={true}
    />
  );
}

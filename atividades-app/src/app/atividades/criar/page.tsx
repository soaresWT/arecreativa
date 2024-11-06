"use client";
import ActivityForm from "@/components/activityForm";
import activityPost from "@/actions/activity-post";
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function CreateActivityPage() {
  const router = useRouter();
  const handleCreatePost = async (formData: any) => {
    const response = await activityPost({}, formData);
    if (response.ok) {
      message.success("Atividade cadastrada com sucesso.");
      router.push("/atividades/lista");
    } else {
      message.error("Erro ao cadastrar atividade. Tente novamente.");
    }
  };

  return (
    <div>
      <ActivityForm
        action="Cadastrar"
        showExportActivityButton={false}
        onSubmit={handleCreatePost}
        initialValues={{}}
      />
    </div>
  );
}

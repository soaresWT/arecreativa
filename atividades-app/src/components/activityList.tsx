"use client";

import { useState, useEffect } from "react";
import { Table, Button, Spin, message, Space, Popconfirm, Modal } from "antd";
import { useRouter } from "next/navigation";
import { DownloadOutlined, FileSearchOutlined } from "@ant-design/icons";
import fetchActivities from "../actions/activity-get";
import downloadPDF from "../actions/pdf-download";
import disableActivity from "@/actions/activity-disable";

interface ActivityRecord {
  id: string;
  title: string;
  total_time: string;
  description: string;
  summary: string;
  required_resources: string;
  objectives: string;
  step_by_step_guide: string;
  bncc_skills: string;
}

export default function ActivityList() {
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityRecord | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await fetchActivities();
      setActivities(data);
    } catch (error) {
      message.error("Erro ao carregar as atividades. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisableActivity = async (id: string) => {
    try {
      const response = await disableActivity(id);

      if (!response.ok) {
        throw new Error("Erro ao desativar a atividade.");
      }

      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== id)
      );

      message.success("Atividade desativada com sucesso!");
    } catch (error) {
      console.error("Erro ao desativar a atividade:", error);
      message.error("Erro ao desativar a atividade");
    }
  };

  const handleDownloadPDF = async (id: string) => {
    try {
      const { data } = await downloadPDF(id);
      const response = await fetch(`${data?.url}/pdf/${id}`, {
        method: "GET",
        headers: {
          Authorization: data?.token || "",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar o PDF da atividade.");
      }

      const pdfBlob = await response.blob();
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "atividade.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Erro ao fazer download do PDF:", error);
      message.error("Erro ao fazer download do PDF da atividade.");
    }
  };

  const showActivityDetails = (activity: ActivityRecord) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedActivity(null);
  };

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: ActivityRecord) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          {text}{" "}
          <Button
            style={{ marginLeft: "10px" }}
            type="default"
            icon={<FileSearchOutlined />}
            onClick={() => showActivityDetails(record)}
          />
        </span>
      ),
    },
    {
      title: "Tempo Total",
      dataIndex: "total_time",
      key: "total_time",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: ActivityRecord) => (
        <Space>
          <Button
            type="link"
            onClick={() => router.push(`/atividades/${record.id}`)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Desabilitar atividade"
            description="Tem certeza que deseja desabilitar esta atividade?"
            onConfirm={() => handleDisableActivity(record.id)}
            okText="Sim"
            cancelText="Não"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger>
              Desabilitar
            </Button>
          </Popconfirm>
          <Button
            type="default"
            onClick={() => handleDownloadPDF(record.id)}
            icon={<DownloadOutlined />}
            size="small"
          >
            Baixar PDF
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        padding: "70px",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Lista de Atividades
      </h2>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={activities}
          rowKey="id"
          pagination={{ pageSize: 10, position: ["topRight"] }}
          scroll={{ y: 400 }}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "500px",
          }}
          locale={{ emptyText: "Nenhuma atividade disponível" }}
        />
      )}
      <Modal
        title="Detalhes da Atividade"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedActivity && (
          <div>
            <p>
              <strong>Título:</strong> {selectedActivity.title}
            </p>
            <p>
              <strong>Resumo:</strong> {selectedActivity.summary}
            </p>
            <p>
              <strong>Objetivos:</strong> {selectedActivity.objectives}
            </p>
            <p>
              <strong>Habilidades BNCC:</strong> {selectedActivity.bncc_skills}
            </p>
            <p>
              <strong>Tempo Total:</strong> {selectedActivity.total_time}
            </p>
            <p>
              <strong>Recursos Necessários:</strong>{" "}
              {selectedActivity.required_resources}
            </p>
            <p>
              <strong>Passo a Passo:</strong>{" "}
              {selectedActivity.step_by_step_guide}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

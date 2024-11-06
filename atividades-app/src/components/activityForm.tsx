import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  Select,
  Row,
  Col,
  message,
  Card,
  Checkbox,
} from "antd";
import { useRouter } from "next/navigation";
import fetchUsers from "../actions/user-get";
import styles from "./activityform.module.css";
import downloadPDF from "../actions/pdf-download";

const { TextArea } = Input;
const { Option } = Select;

interface User {
  id: string;
  name: string;
}

interface Props {
  action: string;
  initialValues: any;
  showExportActivityButton: boolean;
  onSubmit: (formData: any) => void;
}

const bnccOptions = [
  "Conhecimento",
  "Pensamento Científico, Crítico e Criativo",
  "Repertório Cultural",
  "Comunicação",
  "Cultura Digital",
  "Trabalho e Projeto de Vida",
  "Argumentação",
  "Autoconhecimento e Autocuidado",
  "Empatia e Cooperação",
  "Responsabilidade e Cidadania",
];

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        message.error("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading };
};

const FormField = ({ label, required, children }: any) => (
  <Form.Item label={label} required={required} style={{ marginBottom: 24 }}>
    {children}
  </Form.Item>
);

export default function ActivityForm({
  showExportActivityButton,
  action,
  initialValues,
  onSubmit,
}: Props) {
  const [formValues, setFormValues] = useState({
    title: "",
    summary: "",
    objectives: "",
    bncc_skills: [] as string[],
    total_time: "",
    required_resources: "",
    step_by_step_guide: "",
    user_id: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const { users } = useUsers();
  const [timeUnit, setTimeUnit] = useState("horas");
  const [timeValue, setTimeValue] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (initialValues) {
      setFormValues((prev) => ({
        ...prev,
        ...initialValues,
      }));
    }
  }, [initialValues]);

  const handleChange = (field: string) => (value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value?.target?.value ?? value,
    }));
  };

  const handleCheckboxChange = (checkedValues: string[]) => {
    setFormValues((prev) => ({
      ...prev,
      bncc_skills: checkedValues,
    }));
  };

  const updateTotalTime = () => {
    setFormValues((prev) => ({
      ...prev,
      total_time: `${timeValue} ${timeUnit}`,
    }));
  };

  const handleTimeValueChange = (value: number) => {
    setTimeValue(value);
    updateTotalTime();
  };

  const handleTimeUnitChange = (unit: string) => {
    setTimeUnit(unit);
    updateTotalTime();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(
          key,
          key === "bncc_skills" && Array.isArray(value)
            ? JSON.stringify(value)
            : String(value)
        );
      });
      onSubmit(formData);
    } catch (error) {
      console.error("Erro ao cadastrar atividade:", error);
    } finally {
      setLoading(false);
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
    }
  };

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px",
        marginTop: "80px",
      }}
    >
      <Card
        title={`${action} Atividade`}
        bordered={false}
        style={{ borderRadius: 8 }}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ width: "100%" }}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <FormField label="Título" required>
                <Input
                  size="large"
                  value={formValues.title}
                  onChange={handleChange("title")}
                  placeholder="Digite o título da atividade"
                />
              </FormField>
            </Col>
            <Col xs={24} md={12}>
              <FormField label="Selecionar Usuário">
                <Select
                  size="large"
                  placeholder="Selecione o usuário"
                  value={formValues.user_id}
                  onChange={handleChange("user_id")}
                  style={{ width: "100%" }}
                >
                  {users.map((user) => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </FormField>
            </Col>
          </Row>

          <Row>
            <Col xs={24} md={12}>
              <FormField label="Tempo Total" required>
                <Row gutter={8}>
                  <Col span={16}>
                    <Input
                      type="number"
                      size="large"
                      value={timeValue}
                      onChange={(e) =>
                        handleTimeValueChange(Number(e.target.value))
                      }
                      placeholder="Digite o tempo"
                    />
                  </Col>
                  <Col span={8}>
                    <Select
                      size="large"
                      value={timeUnit}
                      onChange={handleTimeUnitChange}
                    >
                      <Option value="horas">Horas</Option>
                      <Option value="dias">Dias</Option>
                      <Option value="meses">Meses</Option>
                    </Select>
                  </Col>
                </Row>
              </FormField>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <FormField label="Resumo">
                <TextArea
                  value={formValues.summary}
                  onChange={handleChange("summary")}
                  placeholder="Digite um resumo da atividade"
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </FormField>
            </Col>
            <Col xs={24} md={12}>
              <FormField label="Objetivos" required>
                <TextArea
                  value={formValues.objectives}
                  onChange={handleChange("objectives")}
                  placeholder="Digite os objetivos da atividade"
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </FormField>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <FormField label="Competências BNCC" required>
                <Checkbox.Group
                  value={formValues.bncc_skills}
                  onChange={handleCheckboxChange}
                >
                  <Row>
                    {bnccOptions.map((option) => (
                      <Col span={12} key={option}>
                        <Checkbox value={option}>{option}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </FormField>
            </Col>
            <Col xs={24} md={12}>
              <FormField label="Recursos Necessários" required>
                <TextArea
                  value={formValues.required_resources}
                  onChange={handleChange("required_resources")}
                  placeholder="Liste os recursos necessários"
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </FormField>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24}>
              <FormField label="Passo a Passo" required>
                <TextArea
                  value={formValues.step_by_step_guide}
                  onChange={handleChange("step_by_step_guide")}
                  placeholder="Descreva o passo a passo da atividade"
                  autoSize={{ minRows: 6, maxRows: 10 }}
                />
              </FormField>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {action} Atividade
            </Button>
            {showExportActivityButton && (
              <Button
                type="default"
                onClick={() => handleDownloadPDF(formValues.id)}
                style={{ marginLeft: 8 }}
              >
                Exportar PDF
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

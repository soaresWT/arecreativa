"use client";

import { useState } from "react";
import { Button, Input, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import register from "../actions/user-post";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const success = await register({}, formData);
      if (success.ok) {
        router.push("/login");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
      alert("Ocorreu um erro ao fazer registro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        style={{
          width: 300,
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
        onFinish={handleSubmit}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Cadastro</h2>
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Nome"
            size="large"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Senha"
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            Cadastrar
          </Button>
        </Form.Item>
        <p>
          Já possui uma conta? <Link href="/login">Faça login.</Link>
        </p>
      </Form>
    </div>
  );
}

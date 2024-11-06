"use client";
import React from "react";
import Header from "../../components/header"; 
import { Layout } from "antd";
import ProtectedRoute from "../../components/ProtectedRoute";

const { Content } = Layout;

import { ReactNode } from "react";

const ActivityLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ActivityLayout;

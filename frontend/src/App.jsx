import React from "react";
import { Col, Layout, Row } from "antd";
import AppHeader from "./components/Appheader/Appheader";
import AppRoutes from "./Routes";
const { Header, Content } = Layout;

const App = () => {
  return (
    <>
      <AppHeader />
      <Content>
        <AppRoutes />
      </Content>
    </>
  );
};

export default App;

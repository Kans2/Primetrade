import React from "react";
import { Layout } from "antd";
import { GithubOutlined, LinkedinOutlined, InstagramOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#f7f7f7",
        marginTop: "40px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <a
          href="https://www.linkedin.com/in/kannan-404-s/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 12px", fontSize: "22px", color: "#0077b5" }}
        >
          <LinkedinOutlined />
        </a>

        <a
          href="https://github.com/Kans2"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 12px", fontSize: "22px", color: "#24292e" }}
        >
          <GithubOutlined />
        </a>

        <a
          href="https://www.instagram.com/kans_404_err/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 12px", fontSize: "22px", color: "#E1306C" }}
        >
          <InstagramOutlined />
        </a>
      </div>

      <p style={{ margin: 0, color: "#555" }}>
        © {new Date().getFullYear()}  Kannan s 
      </p>
    </Footer>
  );
};

export default AppFooter;

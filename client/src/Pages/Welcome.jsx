import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const nav = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        🚀 Welcome to  Task Manager
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Manage your tasks efficiently and stay on top of your goals.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => nav("/register")}
      >
        Sign In / Register
      </Button>
    </Container>
  );
}

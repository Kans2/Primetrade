import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  LinearProgress,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";
import { getTasks } from "../api/tasks";
import api from "../api/api"; // ✅ used to fetch /profile

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  // Summary stats
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const pending = tasks.filter((t) => t.status !== "done").length;

  const summary = [
    {
      title: "Total Tasks",
      value: total,
      icon: <AssignmentIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircleIcon fontSize="large" sx={{ color: "green" }} />,
      color: "green",
    },
    {
      title: "Pending",
      value: pending,
      icon: <PendingActionsIcon fontSize="large" sx={{ color: "orange" }} />,
      color: "orange",
    },
  ];

  const recentTasks = tasks.slice(0, 3);

  return (
    <Layout>
      <Box>
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🚀 Welcome Back{user ? `, ${user.name}` : "..."}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={4}>
            Here’s your personalized dashboard with task insights.
          </Typography>
        </motion.div>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Summary Section */}
            <Grid container spacing={3}>
              {summary.map((item, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 4,
                        "&:hover": { boxShadow: 8 },
                        cursor: "pointer",
                        background: "linear-gradient(145deg, #f0f0f0, #fafafa)",
                      }}
                    >
                      <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar
                            sx={{
                              bgcolor: item.color,
                              width: 56,
                              height: 56,
                            }}
                          >
                            {item.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="h5" fontWeight="bold">
                              {item.value}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Recent Tasks Section */}
            <Box mt={5}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Tasks
              </Typography>
              {recentTasks.length === 0 ? (
                <Typography color="text.secondary">
                  No recent tasks found.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {recentTasks.map((task, idx) => (
                    <Grid item xs={12} md={4} key={task._id || idx}>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <Card
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            boxShadow: 3,
                            "&:hover": { boxShadow: 6 },
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="medium">
                            {task.title}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={task.status === "done" ? 100 : 50}
                            sx={{
                              mt: 2,
                              borderRadius: 1,
                              height: 8,
                              backgroundColor: "#e0e0e0",
                            }}
                          />
                          <Typography
                            variant="caption"
                            display="block"
                            align="right"
                            color="text.secondary"
                            mt={1}
                          >
                            {task.status === "done"
                              ? "Completed"
                              : "In Progress"}
                          </Typography>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

            {/* Profile Card */}
            <Box mt={6}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  boxShadow: 2,
                  background: "linear-gradient(to right, #1976d2, #42a5f5)",
                  color: "#fff",
                }}
              >
                <AccountCircleIcon sx={{ fontSize: 60 }} />
                <Box>
                  <Typography variant="h6">Your Profile</Typography>
                  <Typography variant="body2">
                    Access and edit your personal details easily.
                  </Typography>
                </Box>
              </Card>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}

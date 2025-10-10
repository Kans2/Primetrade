import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Box,
  Tooltip,
  CircularProgress,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState({
    title: '',
    description: '',
    status: 'todo',
  });
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks(search);
      setTasks(res.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search]);

  const handleSave = async () => {
    try {
      if (currentTask._id) {
        await updateTask(currentTask._id, currentTask);
      } else {
        await createTask(currentTask);
      }
      setOpen(false);
      setCurrentTask({ title: '', description: '', status: 'todo' });
      loadTasks();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #1976d2, #42a5f5)',
          borderRadius: 3,
          color: 'white',
          p: 3,
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          📋 Task Manager
        </Typography>
        <Typography variant="subtitle1">
          Organize, track, and manage all your tasks efficiently.
        </Typography>
      </Box>

      {/* Search and Add */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search tasks"
          variant="outlined"
          sx={{ width: '70%' }}
        />
        <Button
          variant="contained"
          startIcon={<AddTaskIcon />}
          sx={{ borderRadius: 2 }}
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      </Box>

      {/* Task List Section */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Typography align="center" color="text.secondary" mt={5}>
          No tasks found. Try adding a new one!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((t, index) => (
            <Grid item xs={12} sm={6} md={4} key={t._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                  }}
                  onClick={() => {
                    setSelectedTask(t);
                    setViewOpen(true);
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1 }}
                      color="primary"
                    >
                      {t.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        height: 40,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {t.description || 'No description'}
                    </Typography>

                    <Typography
                      variant="caption"
                      color={
                        t.status === 'done'
                          ? 'green'
                          : t.status === 'inprogress'
                          ? 'orange'
                          : 'gray'
                      }
                      fontWeight="bold"
                    >
                      {t.status.toUpperCase()}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <Tooltip title="Edit Task">
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentTask(t);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Task">
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(t._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Task Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {currentTask._id ? '✏️ Edit Task' : '➕ Add Task'}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={currentTask.title}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            value={currentTask.description}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, description: e.target.value })
            }
          />
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={currentTask.status}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, status: e.target.value })
            }
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ px: 4 }} onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Task Dialog */}
      {selectedTask && (
        <Dialog
          open={viewOpen}
          onClose={() => setViewOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: { borderRadius: 3, p: 1 },
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold' }}>
            <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Task Details
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {selectedTask.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
              {selectedTask.description || 'No description available.'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    color:
                      selectedTask.status === 'done'
                        ? 'green'
                        : selectedTask.status === 'inprogress'
                        ? 'orange'
                        : 'gray',
                  }}
                >
                  {selectedTask.status.toUpperCase()}
                </span>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
              }}
            >
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                <strong>Last Updated:</strong>{' '}
                {new Date(selectedTask.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Layout>
  );
}

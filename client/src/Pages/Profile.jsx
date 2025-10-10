import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/api';
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion } from 'framer-motion';

export default function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const loadProfile = async () => {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put('/profile', user);
      setSuccess(true);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <Layout>
      {/* Gradient Header */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #1976d2, #42a5f5)',
          borderRadius: 3,
          color: 'white',
          p: 3,
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          👤 Profile
        </Typography>
        <Typography variant="subtitle1">
          View and update your personal details below.
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                maxWidth: 450,
                width: '100%',
                borderRadius: 3,
                boxShadow: 4,
                p: 3,
                background: 'linear-gradient(145deg, #fdfdfd, #f6f9ff)',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#1976d2',
                      width: 80,
                      height: 80,
                      mb: 2,
                    }}
                  >
                    <AccountCircleIcon sx={{ fontSize: 50 }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {user.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>

                {/* Form Fields */}
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  value={user.name}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                  onClick={handleUpdate}
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </Box>
        </motion.div>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ width: '100%' }}
          onClose={() => setSuccess(false)}
        >
          ✅ Profile updated successfully!
        </Alert>
      </Snackbar>
    </Layout>
  );
}

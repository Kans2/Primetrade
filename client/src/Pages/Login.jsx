import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const nav = useNavigate();
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleClose = () => setToast({ ...toast, open: false });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToast({
        open: true,
        message: 'Login successful! Redirecting...',
        severity: 'success',
      });
      setTimeout(() => nav('/dashboard'), 1500);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Invalid email or password.';
      setToast({ open: true, message: msg, severity: 'error' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            borderRadius: 4,
            boxShadow: 6,
            background: 'linear-gradient(145deg, #ffffff, #f7f9fc)',
            p: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Welcome Back
            </Typography>
            <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to continue 🚀
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email')}
                label="Email"
                margin="normal"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register('password')}
                label="Password"
                type="password"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                }}
              >
                Sign In
              </Button>
            </form>

            {/* Register Redirect */}
            <Typography align="center" sx={{ mt: 3 }}>
              Don’t have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => nav('/register')}
                sx={{
                  fontWeight: 600,
                  color: '#1976d2',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Snackbar Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

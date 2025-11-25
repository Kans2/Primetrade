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
import { register as registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required(),
}).required();

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const nav = useNavigate();
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const handleClose = () => setToast({ ...toast, open: false });

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToast({
        open: true,
        message: 'Registration successful! please login',
        severity: 'success',
      });
      setTimeout(() => nav('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration failed. Try again.';
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
              Create Account
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Sign up to get started 🚀
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('name')}
                label="Full Name"
                margin="normal"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                Sign Up
              </Button>
            </form>

            {/* Login Redirect */}
            <Typography align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => nav('/login')}
                sx={{
                  fontWeight: 600,
                  color: '#1976d2',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Sign In
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

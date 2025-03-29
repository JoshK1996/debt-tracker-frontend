'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Mail, Lock } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import Spline with SSR disabled
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Call the backend API to login
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }
      
      // Store the token in localStorage or cookies
      localStorage.setItem('accessToken', responseData.access_token);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth={false} sx={{ 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      padding: 0
    }}>
      {/* Background gradient circles */}
      <Box sx={{ 
        position: 'absolute',
        top: -100,
        right: -100,
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 182, 255, 0.2) 0%, rgba(0, 120, 212, 0.05) 70%, rgba(0, 0, 0, 0) 100%)',
        filter: 'blur(40px)',
        zIndex: 0
      }} />
      
      <Box sx={{ 
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155, 109, 255, 0.2) 0%, rgba(113, 50, 219, 0.05) 70%, rgba(0, 0, 0, 0) 100%)',
        filter: 'blur(40px)',
        zIndex: 0
      }} />
      
      {/* 3D Element Container */}
      <Box sx={{ 
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.8,
        pointerEvents: 'none'
      }}>
        <Spline scene="https://prod.spline.design/mBXRJq5YK-9HsI6d/scene.splinecode" />
      </Box>
      
      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          zIndex: 2,
          width: '100%',
          maxWidth: '450px'
        }}
      >
        <Box className="glass-panel" sx={{ 
          px: 4, 
          py: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image 
              src="/logo.png" 
              alt="Debt Tracker Logo" 
              width={80} 
              height={80} 
              style={{ marginBottom: '1rem' }}
            />
          </motion.div>
          
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Debt Tracker
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
            Sign in to your account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('email', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' 
                } 
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 4 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ 
                py: 1.5, 
                fontSize: '1rem',
                background: 'linear-gradient(90deg, #0078d4 0%, #38b6ff 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #0078d4 0%, #38b6ff 100%)',
                  opacity: 0.9
                }
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
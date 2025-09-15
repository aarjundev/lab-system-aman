import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../services/authService';

const phoneSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

const otpSchema = z.object({
  code: z.string().min(4, 'OTP must be at least 4 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const steps = ['Enter Phone Number', 'Verify OTP & Set New Password'];

  const handlePhoneSubmit = async (data: PhoneFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.sendOTP(data.phone);
      setPhone(data.phone);
      setSuccess('OTP sent to your phone number');
      setActiveStep(1);
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (data: OtpFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.forgotPassword(phone, data.code, data.password, data.confirmPassword);
      setSuccess('Password reset successfully! You can now login with your new password.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
    setError('');
    setSuccess('');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            DSA Booking System
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            Reset Password
          </Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {activeStep === 0 && (
            <Box component="form" onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} sx={{ mt: 1 }}>
              <Controller
                name="phone"
                control={phoneForm.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    autoComplete="tel"
                    autoFocus
                    error={!!phoneForm.formState.errors.phone}
                    helperText={phoneForm.formState.errors.phone?.message}
                  />
                )}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Send OTP'}
              </Button>
            </Box>
          )}

          {activeStep === 1 && (
            <Box component="form" onSubmit={otpForm.handleSubmit(handleOtpSubmit)} sx={{ mt: 1 }}>
              <Controller
                name="code"
                control={otpForm.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="OTP Code"
                    autoFocus
                    error={!!otpForm.formState.errors.code}
                    helperText={otpForm.formState.errors.code?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={otpForm.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="New Password"
                    type="password"
                    autoComplete="new-password"
                    error={!!otpForm.formState.errors.password}
                    helperText={otpForm.formState.errors.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={otpForm.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    autoComplete="new-password"
                    error={!!otpForm.formState.errors.confirmPassword}
                    helperText={otpForm.formState.errors.confirmPassword?.message}
                  />
                )}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{ flex: 1 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ flex: 1 }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                </Button>
              </Box>
            </Box>
          )}

          <Box textAlign="center" mt={2}>
            <Link component={RouterLink} to="/login">
              Back to Login
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;

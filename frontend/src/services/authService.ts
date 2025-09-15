import { apiService } from './api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

export const authService = {
  async login(phone: string, password: string): Promise<AuthResponse> {
    return apiService.post('/userapp/auth/login', { phone, password });
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return apiService.post('/userapp/auth/register', userData);
  },

  async getCurrentUser(): Promise<{ data: User }> {
    return apiService.get('/userapp/auth/me');
  },

  async logout(): Promise<{ message: string }> {
    return apiService.post('/userapp/auth/logout');
  },

  async sendOTP(phone: string): Promise<{ data: string; message: string }> {
    return apiService.put('/userapp/auth/send-otp', { phone });
  },

  async forgotPassword(phone: string, code: string, password: string, confirmPassword: string): Promise<{ message: string }> {
    return apiService.put('/userapp/auth/forgot-password', {
      phone,
      code,
      password,
      confirmPassword,
    });
  },

  async resetPassword(password: string, confirmPassword: string): Promise<{ message: string }> {
    return apiService.put('/userapp/auth/reset-password', {
      password,
      confirmPassword,
    });
  },
};

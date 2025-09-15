import { apiService } from './api';
import { 
  HomeCollection, 
  TimeSlot, 
  Booking, 
  Package, 
  Report, 
  HomeCollectionForm, 
  SlotBookingForm, 
  PackageSearchForm,
  PaginatedResponse 
} from '../types';

export const dsaBookingService = {
  // Home Collection APIs
  async createHomeCollection(data: HomeCollectionForm): Promise<{ data: HomeCollection; message: string }> {
    return apiService.post('/dsa/home-collection', data);
  },

  async getHomeCollections(page = 1, limit = 10): Promise<PaginatedResponse<HomeCollection>> {
    return apiService.get(`/dsa/home-collection?page=${page}&limit=${limit}`);
  },

  async getHomeCollectionById(id: string): Promise<{ data: HomeCollection }> {
    return apiService.get(`/dsa/home-collection/${id}`);
  },

  async updateHomeCollection(id: string, data: Partial<HomeCollectionForm>): Promise<{ data: HomeCollection; message: string }> {
    return apiService.put(`/dsa/home-collection/${id}`, data);
  },

  async cancelHomeCollection(id: string): Promise<{ message: string }> {
    return apiService.put(`/dsa/home-collection/${id}/cancel`);
  },

  // Time Slots APIs
  async getAvailableSlots(date: string): Promise<{ data: TimeSlot[] }> {
    return apiService.get(`/dsa/slots/available?date=${date}`);
  },

  async getSlotsByDateRange(startDate: string, endDate: string): Promise<{ data: TimeSlot[] }> {
    return apiService.get(`/dsa/slots?startDate=${startDate}&endDate=${endDate}`);
  },

  async bookSlot(data: SlotBookingForm): Promise<{ data: Booking; message: string }> {
    return apiService.post('/dsa/slots/book', data);
  },

  // Booking Management APIs
  async getBookings(page = 1, limit = 10, status?: string): Promise<PaginatedResponse<Booking>> {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (status) params.append('status', status);
    return apiService.get(`/dsa/bookings?${params.toString()}`);
  },

  async getBookingById(id: string): Promise<{ data: Booking }> {
    return apiService.get(`/dsa/bookings/${id}`);
  },

  async updateBooking(id: string, data: Partial<Booking>): Promise<{ data: Booking; message: string }> {
    return apiService.put(`/dsa/bookings/${id}`, data);
  },

  async cancelBooking(id: string): Promise<{ message: string }> {
    return apiService.put(`/dsa/bookings/${id}/cancel`);
  },

  async confirmBooking(id: string): Promise<{ data: Booking; message: string }> {
    return apiService.put(`/dsa/bookings/${id}/confirm`);
  },

  // Package Lookup APIs
  async searchPackages(searchParams: PackageSearchForm, page = 1, limit = 10): Promise<PaginatedResponse<Package>> {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    return apiService.get(`/dsa/packages/search?${params.toString()}`);
  },

  async getPackageById(id: string): Promise<{ data: Package }> {
    return apiService.get(`/dsa/packages/${id}`);
  },

  async getPackagesByCategory(category: string, page = 1, limit = 10): Promise<PaginatedResponse<Package>> {
    return apiService.get(`/dsa/packages/category/${category}?page=${page}&limit=${limit}`);
  },

  async getAllCategories(): Promise<{ data: string[] }> {
    return apiService.get('/dsa/packages/categories');
  },

  // Reports APIs
  async generateReport(type: 'daily' | 'weekly' | 'monthly' | 'custom', period?: string): Promise<{ data: Report }> {
    const params = new URLSearchParams({ type });
    if (period) params.append('period', period);
    return apiService.post(`/dsa/reports/generate?${params.toString()}`);
  },

  async getReports(page = 1, limit = 10): Promise<PaginatedResponse<Report>> {
    return apiService.get(`/dsa/reports?page=${page}&limit=${limit}`);
  },

  async getReportById(id: string): Promise<{ data: Report }> {
    return apiService.get(`/dsa/reports/${id}`);
  },

  async downloadReport(id: string, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> {
    const response = await apiService.get(`/dsa/reports/${id}/download?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Dashboard Analytics
  async getDashboardStats(): Promise<{
    data: {
      totalBookings: number;
      completedBookings: number;
      pendingBookings: number;
      cancelledBookings: number;
      totalRevenue: number;
      monthlyRevenue: number;
      topPackages: Package[];
      recentBookings: Booking[];
    };
  }> {
    return apiService.get('/dsa/dashboard/stats');
  },
};

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email?: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  data: User & { token: string };
  message: string;
}

// DSA Booking Types
export interface HomeCollection {
  id: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactNumber: string;
  collectionDate: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  packageId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  date: string;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  homeCollectionId?: string;
  slotId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  tests: string[];
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  period: string;
  totalBookings: number;
  totalRevenue: number;
  completedBookings: number;
  cancelledBookings: number;
  data: any[];
  generatedAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  paginator: {
    currentPage: number;
    perPage: number;
    pageCount: number;
    itemCount: number;
    next: number | null;
    prev: number | null;
  };
}

// Form Types
export interface HomeCollectionForm {
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactNumber: string;
  collectionDate: string;
  timeSlot: string;
  packageId: string;
}

export interface SlotBookingForm {
  slotId: string;
  packageId: string;
  homeCollectionId?: string;
}

export interface PackageSearchForm {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

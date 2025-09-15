import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Assignment,
  CheckCircle,
  Pending,
  Cancel,
  TrendingUp,
  Schedule,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { dsaBookingService } from '../../services/dsaBookingService';

interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  topPackages: Array<{
    packageId: string;
    name: string;
    price: number;
    duration: number;
    bookingCount: number;
    revenue: number;
  }>;
  recentBookings: Array<{
    id: string;
    status: string;
    totalAmount: number;
    bookingDate: string;
    packageId: {
      name: string;
      price: number;
    };
  }>;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await dsaBookingService.getDashboardStats();
      setStats(response.data);
    } catch (error: any) {
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Here's an overview of your DSA booking activities
      </Typography>

      {stats && (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Assignment color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Total Bookings
                      </Typography>
                      <Typography variant="h4">
                        {stats.totalBookings}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <CheckCircle color="success" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Completed
                      </Typography>
                      <Typography variant="h4">
                        {stats.completedBookings}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Pending color="warning" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Pending
                      </Typography>
                      <Typography variant="h4">
                        {stats.pendingBookings}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Cancel color="error" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Cancelled
                      </Typography>
                      <Typography variant="h4">
                        {stats.cancelledBookings}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Revenue Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <TrendingUp color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        Total Revenue
                      </Typography>
                      <Typography variant="h4">
                        {formatCurrency(stats.totalRevenue)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Schedule color="secondary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography color="textSecondary" gutterBottom>
                        This Month
                      </Typography>
                      <Typography variant="h4">
                        {formatCurrency(stats.monthlyRevenue)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Top Packages */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Top Packages
                </Typography>
                <List>
                  {stats.topPackages.map((pkg, index) => (
                    <React.Fragment key={pkg.packageId}>
                      <ListItem>
                        <ListItemIcon>
                          <Typography variant="h6" color="primary">
                            {index + 1}
                          </Typography>
                        </ListItemIcon>
                        <ListItemText
                          primary={pkg.name}
                          secondary={`${pkg.bookingCount} bookings • ${formatCurrency(pkg.revenue)}`}
                        />
                      </ListItem>
                      {index < stats.topPackages.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Recent Bookings */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Bookings
                </Typography>
                <List>
                  {stats.recentBookings.map((booking, index) => (
                    <React.Fragment key={booking.id}>
                      <ListItem>
                        <ListItemText
                          primary={booking.packageId.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {new Date(booking.bookingDate).toLocaleDateString()}
                              </Typography>
                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                <Chip
                                  label={booking.status}
                                  color={getStatusColor(booking.status) as any}
                                  size="small"
                                />
                                <Typography variant="body2" fontWeight="bold">
                                  {formatCurrency(booking.totalAmount)}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < stats.recentBookings.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;

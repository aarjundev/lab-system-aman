# DSA Booking System - Setup Instructions

## Quick Start Guide

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following content:
```env
MONGODB_URI=mongodb://localhost:27017/dsa-booking
ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
ACCESS_TOKEN_EXPIRY=86400
CORS_ORIGIN=http://localhost:5173
PORT=3000
NODE_ENV=development
```

4. Start MongoDB (if running locally):
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

5. Seed sample data:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:3000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following content:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

### 3. Testing the Application

1. Open your browser and go to `http://localhost:5173`
2. Register a new account or use the sample credentials:
   - Phone: `9876543210`
   - Password: `password123`
3. Explore the dashboard and features

### 4. API Testing with Postman

1. Import the `DSA_Booking_API_Collection.postman_collection.json` file into Postman
2. Set the `baseUrl` variable to `http://localhost:3000/api/v1`
3. Register/login to get an auth token
4. Set the `authToken` variable with the received token
5. Test all the API endpoints

## Sample Data

The seeder creates:
- 1 sample user (phone: 9876543210, password: password123)
- 5 sample packages across different categories
- 30 days of time slots
- 2 sample home collections
- 2 sample bookings

## Features Available

✅ **Completed:**
- User authentication (register, login, password reset)
- Backend API endpoints for all DSA booking features
- Frontend authentication pages
- Dashboard with statistics
- API integration layer
- Postman collection
- Comprehensive documentation

🔄 **In Progress/To Be Implemented:**
- Detailed frontend pages for each feature
- Form validation with react-hook-form and zod
- Advanced UI components
- Error handling and loading states
- Responsive design improvements

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **CORS Error:**
   - Verify CORS_ORIGIN in backend .env matches frontend URL
   - Check that both servers are running

3. **Authentication Issues:**
   - Ensure JWT secret is set in backend .env
   - Check token expiration settings

4. **Frontend Build Issues:**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## Next Steps

1. Implement detailed frontend pages for each feature
2. Add comprehensive form validation
3. Implement error handling and loading states
4. Add responsive design improvements
5. Add unit and integration tests
6. Deploy to production

## Support

For issues or questions, please refer to the README.md file or create an issue in the repository.

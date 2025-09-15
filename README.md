# DSA Booking System - Fullstack Application

A comprehensive fullstack application for DSA (Diagnostic Service Agency) booking management with home collection, slot booking, package lookup, and reporting features.

## 🚀 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **Passport.js** for authentication
- **Joi** for request validation
- **JWT** for token-based authentication

### Frontend
- **React 18** with **TypeScript**
- **Vite** for build tooling
- **Material-UI (MUI)** for UI components
- **React Hook Form** with **Zod** for form validation
- **Axios** for API communication
- **React Router** for navigation

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── package.json
└── DSA_Booking_API_Collection.postman_collection.json
```

## 🛠️ Features

### Authentication
- User registration and login
- Password reset with OTP verification
- JWT-based authentication
- Protected routes

### Home Collection Management
- Create home collection requests
- View collection history
- Update collection details
- Cancel collections

### Slot Booking
- View available time slots
- Book slots for appointments
- Manage slot availability

### Booking Management
- Create, update, and cancel bookings
- Track booking status
- View booking history
- Payment status tracking

### Package Lookup
- Search packages by name, category, or price
- View package details
- Filter by categories
- Browse available packages

### Reports & Analytics
- Generate daily, weekly, monthly reports
- View booking statistics
- Revenue analytics
- Download reports in PDF/Excel format

### Dashboard
- Overview of user activities
- Key metrics and statistics
- Recent bookings
- Top packages

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/dsa-booking
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=86400
CORS_ORIGIN=http://localhost:5173
PORT=3000
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

5. Start the frontend development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/userapp/auth/register` | Register new user |
| POST | `/api/v1/userapp/auth/login` | User login |
| GET | `/api/v1/userapp/auth/me` | Get current user |
| PUT | `/api/v1/userapp/auth/send-otp` | Send OTP for password reset |
| PUT | `/api/v1/userapp/auth/forgot-password` | Reset password with OTP |
| PUT | `/api/v1/userapp/auth/reset-password` | Reset password (authenticated) |
| POST | `/api/v1/userapp/auth/logout` | User logout |

### DSA Booking Endpoints

#### Home Collection
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/dsa/home-collection` | Create home collection request |
| GET | `/api/v1/dsa/home-collection` | Get user's home collections |
| GET | `/api/v1/dsa/home-collection/:id` | Get specific home collection |
| PUT | `/api/v1/dsa/home-collection/:id` | Update home collection |
| PUT | `/api/v1/dsa/home-collection/:id/cancel` | Cancel home collection |

#### Time Slots
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dsa/slots/available` | Get available slots for date |
| GET | `/api/v1/dsa/slots` | Get slots by date range |
| POST | `/api/v1/dsa/slots/book` | Book a time slot |

#### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dsa/bookings` | Get user's bookings |
| GET | `/api/v1/dsa/bookings/:id` | Get specific booking |
| PUT | `/api/v1/dsa/bookings/:id` | Update booking |
| PUT | `/api/v1/dsa/bookings/:id/cancel` | Cancel booking |
| PUT | `/api/v1/dsa/bookings/:id/confirm` | Confirm booking |

#### Packages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dsa/packages/search` | Search packages |
| GET | `/api/v1/dsa/packages/:id` | Get package details |
| GET | `/api/v1/dsa/packages/category/:category` | Get packages by category |
| GET | `/api/v1/dsa/packages/categories` | Get all categories |

#### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/dsa/reports/generate` | Generate report |
| GET | `/api/v1/dsa/reports` | Get user's reports |
| GET | `/api/v1/dsa/reports/:id` | Get specific report |
| GET | `/api/v1/dsa/reports/:id/download` | Download report |

#### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dsa/dashboard/stats` | Get dashboard statistics |

## 🧪 Testing with Postman

Import the provided `DSA_Booking_API_Collection.postman_collection.json` file into Postman to test all API endpoints.

### Setup for Testing:
1. Import the collection
2. Set the `baseUrl` variable to `http://localhost:3000/api/v1`
3. Register a new user or login to get an auth token
4. Set the `authToken` variable with the received token
5. Test the protected endpoints

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/dsa-booking
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=86400
CORS_ORIGIN=http://localhost:5173
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## 📦 Database Models

### User
- Basic user information
- Authentication details
- User preferences

### HomeCollection
- Collection address and contact details
- Collection date and time slot
- Package and user references
- Status tracking

### TimeSlot
- Available time slots
- Booking capacity
- Date and time information

### Booking
- User and package references
- Payment information
- Status tracking
- Collection and slot references

### Package
- Package details and pricing
- Test information
- Category classification

### Report
- Report generation data
- Analytics and statistics
- User-specific reports

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - Authentication system
  - Home collection management
  - Slot booking
  - Package lookup
  - Basic reporting
  - Dashboard analytics

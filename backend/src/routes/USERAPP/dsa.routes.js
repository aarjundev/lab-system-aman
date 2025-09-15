import { Router } from "express";
import { auth } from "../../middlewares/auth.middlewares.js";
import { PLATFORM } from "../../constants.js";

// Home Collection Routes
import {
  createHomeCollection,
  getHomeCollections,
  getHomeCollectionById,
  updateHomeCollection,
  cancelHomeCollection,
} from "../../controllers/userapp/v1/homeCollection.controller.js";

// Time Slot Routes
import {
  getAvailableSlots,
  getSlotsByDateRange,
  bookSlot,
} from "../../controllers/userapp/v1/timeSlot.controller.js";

// Booking Routes
import {
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  confirmBooking,
} from "../../controllers/userapp/v1/booking.controller.js";

// Package Routes
import {
  searchPackages,
  getPackageById,
  getPackagesByCategory,
  getAllCategories,
} from "../../controllers/userapp/v1/package.controller.js";

// Report Routes
import {
  generateReport,
  getReports,
  getReportById,
  downloadReport,
} from "../../controllers/userapp/v1/report.controller.js";

// Dashboard Routes
import {
  getDashboardStats,
} from "../../controllers/userapp/v1/dashboard.controller.js";

const router = Router();

// Home Collection Routes
router.route("/home-collection")
  .post(auth(PLATFORM.USERAPP), createHomeCollection)
  .get(auth(PLATFORM.USERAPP), getHomeCollections);

router.route("/home-collection/:id")
  .get(auth(PLATFORM.USERAPP), getHomeCollectionById)
  .put(auth(PLATFORM.USERAPP), updateHomeCollection);

router.route("/home-collection/:id/cancel")
  .put(auth(PLATFORM.USERAPP), cancelHomeCollection);

// Time Slot Routes
router.route("/slots/available")
  .get(auth(PLATFORM.USERAPP), getAvailableSlots);

router.route("/slots")
  .get(auth(PLATFORM.USERAPP), getSlotsByDateRange);

router.route("/slots/book")
  .post(auth(PLATFORM.USERAPP), bookSlot);

// Booking Routes
router.route("/bookings")
  .get(auth(PLATFORM.USERAPP), getBookings);

router.route("/bookings/:id")
  .get(auth(PLATFORM.USERAPP), getBookingById)
  .put(auth(PLATFORM.USERAPP), updateBooking);

router.route("/bookings/:id/cancel")
  .put(auth(PLATFORM.USERAPP), cancelBooking);

router.route("/bookings/:id/confirm")
  .put(auth(PLATFORM.USERAPP), confirmBooking);

// Package Routes
router.route("/packages/search")
  .get(auth(PLATFORM.USERAPP), searchPackages);

router.route("/packages/:id")
  .get(auth(PLATFORM.USERAPP), getPackageById);

router.route("/packages/category/:category")
  .get(auth(PLATFORM.USERAPP), getPackagesByCategory);

router.route("/packages/categories")
  .get(auth(PLATFORM.USERAPP), getAllCategories);

// Report Routes
router.route("/reports/generate")
  .post(auth(PLATFORM.USERAPP), generateReport);

router.route("/reports")
  .get(auth(PLATFORM.USERAPP), getReports);

router.route("/reports/:id")
  .get(auth(PLATFORM.USERAPP), getReportById);

router.route("/reports/:id/download")
  .get(auth(PLATFORM.USERAPP), downloadReport);

// Dashboard Routes
router.route("/dashboard/stats")
  .get(auth(PLATFORM.USERAPP), getDashboardStats);

export default router;

import { asyncHandler } from "../../../utils/asyncHandler.js";
import { validateParamsWithJoi } from "../../../utils/validateRequest.js";
import { HomeCollection } from "../../../models/homeCollection.model.js";
import { Package } from "../../../models/package.model.js";
import {
  dbServiceCreate,
  dbServiceFindOne,
  dbServiceUpdateOne,
  dbServiceFind,
} from "../../../db/dbServices.js";
import { isValidObjectId } from "mongoose";
import dayjs from "dayjs";

// Validation schemas
const homeCollectionSchema = {
  address: { type: "string", required: true, min: 10, max: 200 },
  city: { type: "string", required: true, min: 2, max: 50 },
  state: { type: "string", required: true, min: 2, max: 50 },
  pincode: { type: "string", required: true, pattern: "^[0-9]{6}$" },
  contactPerson: { type: "string", required: true, min: 2, max: 100 },
  contactNumber: { type: "string", required: true, pattern: "^[0-9]{10}$" },
  collectionDate: { type: "date", required: true },
  timeSlot: { type: "string", required: true },
  packageId: { type: "string", required: true },
  specialInstructions: { type: "string", max: 500 },
};

export const createHomeCollection = asyncHandler(async (req, res) => {
  const { packageId, collectionDate, ...collectionData } = req.body;

  // Validate request
  const validateRequest = validateParamsWithJoi(req.body, homeCollectionSchema);
  if (!validateRequest.isValid) {
    return res.validationError({
      message: `Invalid values in parameters, ${validateRequest.message}`,
    });
  }

  // Check if package exists
  if (!isValidObjectId(packageId)) {
    return res.validationError({ message: "Invalid package ID" });
  }

  const packageExists = await dbServiceFindOne(Package, { _id: packageId, isActive: true });
  if (!packageExists) {
    return res.notFound({ message: "Package not found" });
  }

  // Check if collection date is in the future
  const collectionDateObj = dayjs(collectionDate);
  if (collectionDateObj.isBefore(dayjs(), 'day')) {
    return res.validationError({ message: "Collection date must be in the future" });
  }

  // Create home collection
  const homeCollection = new HomeCollection({
    ...collectionData,
    packageId,
    collectionDate: collectionDateObj.toDate(),
    userId: req.user.id,
  });

  const result = await dbServiceCreate(HomeCollection, homeCollection);

  return res.success({
    data: result,
    message: "Home collection request created successfully",
  });
});

export const getHomeCollections = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  let query = {
    userId: req.user.id,
    isActive: true,
    isDeleted: false,
  };

  if (status) {
    query.status = status;
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    populate: [
      { path: "packageId", select: "name price duration" },
    ],
    sort: { createdAt: -1 },
  };

  const result = await dbServiceFind(HomeCollection, query, options);

  return res.success({
    data: result,
    message: "Home collections retrieved successfully",
  });
});

export const getHomeCollectionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.validationError({ message: "Invalid home collection ID" });
  }

  const query = {
    _id: id,
    userId: req.user.id,
    isActive: true,
    isDeleted: false,
  };

  const homeCollection = await dbServiceFindOne(HomeCollection, query, {
    populate: [
      { path: "packageId", select: "name price duration tests" },
    ],
  });

  if (!homeCollection) {
    return res.notFound({ message: "Home collection not found" });
  }

  return res.success({
    data: homeCollection,
    message: "Home collection retrieved successfully",
  });
});

export const updateHomeCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!isValidObjectId(id)) {
    return res.validationError({ message: "Invalid home collection ID" });
  }

  // Remove fields that shouldn't be updated
  delete updateData.userId;
  delete updateData._id;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  // If updating collection date, validate it
  if (updateData.collectionDate) {
    const collectionDateObj = dayjs(updateData.collectionDate);
    if (collectionDateObj.isBefore(dayjs(), 'day')) {
      return res.validationError({ message: "Collection date must be in the future" });
    }
    updateData.collectionDate = collectionDateObj.toDate();
  }

  const query = {
    _id: id,
    userId: req.user.id,
    isActive: true,
    isDeleted: false,
  };

  const result = await dbServiceUpdateOne(HomeCollection, query, updateData, {
    new: true,
    populate: [
      { path: "packageId", select: "name price duration" },
    ],
  });

  if (!result) {
    return res.notFound({ message: "Home collection not found" });
  }

  return res.success({
    data: result,
    message: "Home collection updated successfully",
  });
});

export const cancelHomeCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.validationError({ message: "Invalid home collection ID" });
  }

  const query = {
    _id: id,
    userId: req.user.id,
    isActive: true,
    isDeleted: false,
  };

  const result = await dbServiceUpdateOne(
    HomeCollection,
    query,
    { status: "cancelled" },
    { new: true }
  );

  if (!result) {
    return res.notFound({ message: "Home collection not found" });
  }

  return res.success({
    data: result,
    message: "Home collection cancelled successfully",
  });
});

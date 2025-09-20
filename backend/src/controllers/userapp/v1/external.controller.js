import axios from "axios";
import joi from "joi";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const BASE = process.env.EXTERNAL_API_BASE_URL;
const API_KEY = process.env.EXTERNAL_API_KEY;
const CORP_CODE = process.env.EXTERNAL_API_CORP_CODE;
const axiosClient = axios.create({ timeout: 15000 });

const withAuthHeaders = () => {
console.log("BASE", BASE, "API_KEY", API_KEY, "CORP_CODE", CORP_CODE);

  const headers = { "key": "h3r7aRrq7AchshiXhCTvGOkG9kJXIKe6","Cookie": 'gDeviceId=fec5ae01-a8af-48bb-acee-5b45b3fbfe01' };
  // if (CORP_CODE) headers["corp-code"] = CORP_CODE;
  return headers;
};

const requireExternalConfig = (res) => {
  console.log("BASE", BASE, "API_KEY", API_KEY);
  if (!BASE || !API_KEY) {
    res.internalServerError({ message: "External API environment not configured" });
    return false;
  }
  return true;
};

// GET eloc by place_query
export const getElocByPlace = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const schema = joi.object({ place_query: joi.string().trim().required() });
  const { error } = schema.validate(req.query);
  console.log("error", error);
  if (error) return res.validationError({ message: error.message });

  const url = `https://apiqa.redcliffelabs.com/api/partner/v2/get-partner-location-2-eloc/?place_query=${req.query.place_query}`;
  console.log("url", url);
  const response = await axios.get(url, {
    // params: { place_query: req.query.place_query },
    headers: withAuthHeaders(),
  });
  console.log("response", response);
  return res.success({ data: response.data });
});

// GET lat/long by eloc
export const getLatLongByEloc = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const schema = joi.object({ eloc: joi.string().length(6).alphanum().required() });
  const { error } = schema.validate(req.query);
  if (error) return res.validationError({ message: error.message });

  const url = `${BASE}/api/partner/v2/get-partner-loc-2-eloc/`;
  const response = await axiosClient.get(url, {
    params: { eloc: req.query.eloc },
    headers: withAuthHeaders(),
  });
  return res.success({ data: response.data });
});

// GET time slots by date and lat/long
export const getExternalTimeSlots = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const schema = joi.object({
    collection_date: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    latitude: joi.number().required(),
    longitude: joi.number().required(),
    customer_gender: joi.string().valid("male", "female").optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) return res.validationError({ message: error.message });

  const url = `${BASE}/api/booking/v2/get-time-slot-list/`;
  const response = await axiosClient.get(url, {
    params: req.query,
    headers: withAuthHeaders(),
  });
  return res.success({ data: response.data });
});

// POST create booking
export const createExternalBooking = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  // Minimal validation based on docs; external API will enforce the rest
  const schema = joi.object({
    booking_date: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    collection_slot: joi.number().required(),
    package_code: joi.alternatives().try(joi.string(), joi.array().items(joi.string())).required(),
    customer_phonenumber: joi.string().pattern(/^[6-9]\d{9}$/).required(),
    customer_whatsapppnumber: joi.string().pattern(/^[6-9]\d{9}$/).required(),
    customer_latitude: joi.number().required(),
    customer_longitude: joi.number().required(),
    customer_name: joi.string().min(3).max(30).required(),
    pincode: joi.string().pattern(/^\d{6}$/).required(),
    is_credit: joi.boolean().required(),
    customer_gender: joi.string().valid("Male", "Female").required(),
    customer_landmark: joi.string().required(),
    customer_address: joi.string().required(),
    customer_email: joi.string().email().required(),
  }).unknown(true);
  const { error } = schema.validate(req.body);
  if (error) return res.validationError({ message: error.message });

  const url = `${BASE}/api/external/v2/center-create-booking/`;
  const response = await axiosClient.post(url, req.body, { headers: withAuthHeaders() });
  return res.success({ data: response.data });
});

// GET consolidated report
export const getConsolidatedReport = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const { bookingId } = req.params;
  const url = `${BASE}/api/external/v2/get-consolidated-report/${encodeURIComponent(bookingId)}`;
  const response = await axiosClient.get(url, { headers: withAuthHeaders() });
  return res.success({ data: response.data });
});

// GET package details by code
export const getPackageDetailsByCode = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const schema = joi.object({ code: joi.string().required() });
  const { error } = schema.validate(req.query);
  if (error) return res.validationError({ message: error.message });
  const url = `${BASE}/api/external/v2/package-parameter-data/`;
  const response = await axiosClient.get(url, { params: { code: req.query.code }, headers: withAuthHeaders() });
  return res.success({ data: response.data });
});

// GET package data search
export const searchPackagesExternal = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const schema = joi.object({ search: joi.string().allow("").default("") });
  const { error } = schema.validate(req.query);
  if (error) return res.validationError({ message: error.message });
  const url = `${BASE}/api/external/v2/center-package-data/`;
  const response = await axiosClient.get(url, { params: req.query, headers: withAuthHeaders() });
  return res.success({ data: response.data });
});

// GET booking confirmation/status
export const getBookingConfirmation = asyncHandler(async (req, res) => {
  if (!requireExternalConfig(res)) return;
  const url = `${BASE}/api/external/v2/center-get-booking`;
  const response = await axiosClient.get(url, { params: req.query, headers: withAuthHeaders() });
  return res.success({ data: response.data });
});



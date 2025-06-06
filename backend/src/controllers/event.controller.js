import Event from "../models/event.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addNewEvent = AsyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      email,
      phone,
      address,
      city,
      organizerDetails,
      displayStatus,
      date,
    } = req.body;

    const images = req.files;

    if (
      [title, description, email, phone, city, organizerDetails].some(
        (field) => !String(field).trim()
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    if (!images || images.length === 0) {
      throw new ApiError(400, "At least one image is required");
    }

    const existing = await Event.findOne({ email });
    if (existing) {
      throw new ApiError(409, "Event with this email already exists");
    }

    // ✅ Upload to Cloudinary (awaited properly)
    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        const result = await uploadOnCloudinary(file.path);
        return result?.url;
      })
    );

    if (uploadedImages.length === 0 || uploadedImages.includes(undefined)) {
      throw new ApiError(500, "Image upload failed");
    }

    const newEvent = await Event.create({
      title,
      description,
      email,
      phone,
      address,
      city,
      organizerDetails,
      displayStatus,
      date,
      images: uploadedImages,
      createdBy: req.user._id,
    });

    const eventUrl = `${process.env.FRONTEND_URL}/event/${newEvent._id}`;

    res
      .status(201)
      .json(new ApiResponse(201, { eventUrl }, "Event created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

export { addNewEvent };

import Event from "../models/event.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

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

const viewSingleEvent = AsyncHandler(async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      throw new ApiError(400, "all fields are required");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, event, "event fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

const editEventDetails = AsyncHandler(async (req, res) => {
  try {
    const {
      eventId,
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

    const files = req.files;

    if (!eventId) {
      throw new ApiError(400, "Event ID is required");
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    // === Upload new images to Cloudinary ===
    let uploadedImageUrls = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await uploadOnCloudinary(file.path, {
          folder: "swipo-events", // optional folder in Cloudinary
        });
        uploadedImageUrls.push(result.url);
      }

      // Replace old images with new Cloudinary URLs
      event.images = uploadedImageUrls;
    }

    // === Update other fields ===
    event.title = title || event.title;
    event.description = description || event.description;
    event.email = email || event.email;
    event.phone = phone || event.phone;
    event.address = address || event.address;
    event.city = city || event.city;
    event.organizerDetails = organizerDetails || event.organizerDetails;
    event.displayStatus = displayStatus ?? event.displayStatus;
    event.date = date || event.date;

    await event.save();

    return res
      .status(200)
      .json(new ApiResponse(200, event, "Event edited successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

const deleteEvent = AsyncHandler(async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      throw new ApiError(400, "Event ID is required");
    }

    const event = await Event.findById(eventId);
    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    // 🧹 Delete images from Cloudinary
    if (event.images && event.images.length > 0) {
      for (const imageUrl of event.images) {
         await cloudinary.uploader.destroy(imageUrl);
         
      }
    }

    // Delete event from DB
    await Event.findByIdAndDelete(eventId);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Event deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

export { addNewEvent, viewSingleEvent, editEventDetails, deleteEvent };

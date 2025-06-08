import Event from "../models/event.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

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
      if (event.images && event.images.length > 0) {
        for (const imageUrl of event.images) {
          await deleteFromCloudinary(imageUrl);
        }
      }

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
        await deleteFromCloudinary(imageUrl);
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

const getUsersEvents = AsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { title, city, date } = req.query;

    // Base query for the user
    const query = { createdBy: userId };

    // Search by title (case-insensitive)
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Filter by city
    if (city) {
      query.city = city;
    }

    // Filter by date
    if (date) {
      query.date = new Date(date);
    }

    const totalEvents = await Event.countDocuments(query);

    const events = await Event.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          totalEvents,
          totalPages: Math.ceil(totalEvents / limit),
          currentPage: page,
          data: events,
        },
        "Events fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

// This controller works for users as well as admin
const getAllEventsAdvanced = AsyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10, title, city, date } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const queryObj = {};

    if (title) {
      queryObj.title = { $regex: title, $options: "i" }; // case-insensitive search
    }

    if (city) {
      queryObj.city = { $regex: city, $options: "i" };
    }

    if (date) {
      queryObj.date = date; // assuming ISO format like '2025-06-10'
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(queryObj)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalEvents = await Event.countDocuments(queryObj);
    const totalPages = Math.ceil(totalEvents / limit);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          events,
          meta: {
            totalEvents,
            totalPages,
            currentPage: page,
            limit,
          },
        },
        "Events fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

export {
  addNewEvent,
  viewSingleEvent,
  editEventDetails,
  deleteEvent,
  getAllEventsAdvanced,
  getUsersEvents,
};

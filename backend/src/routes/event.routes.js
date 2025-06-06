import { Router } from "express";
import {
  addNewEvent,
  deleteEvent,
  editEventDetails,
  getAllEventWithPagination,
  viewSingleEvent,
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.midlleware.js";

const router = Router();

router.post(
  "/addevent",
  verifyJWT, // 🔒 Protected route
  upload.array("images", 5), // 🖼 Accept multiple files with field name 'images'
  addNewEvent
);
router.route("/view-event/:eventId").get(viewSingleEvent);
router.route("/edit-event").put(upload.array("images"), editEventDetails);
router.route("/delete-event/:eventId").delete(deleteEvent);
router.route("/events").get(getAllEventWithPagination);
export default router;

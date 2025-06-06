
import { Router } from "express";
import { addNewEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.midlleware.js";

const router = Router();

router.post(
  "/addevent",
  verifyJWT,                   // 🔒 Protected route
  upload.array("images", 5),   // 🖼 Accept multiple files with field name 'images'
  addNewEvent
);

export default router;

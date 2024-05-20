import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { postMessage, getMessage, postPrompt } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/", verifyJWT, postMessage);
router.get("/:conversationId", verifyJWT, getMessage);

router.post("/prompt", verifyJWT, postPrompt);

export default router;
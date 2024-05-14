import express from "express";
import {
  getConversation,
  getMembersConversation,
  newConversation,
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, newConversation);
router.get("/:userId", verifyJWT, getConversation);
router.get(
  "/find/:firstUserId/:secondUserId",
  verifyJWT,
  getMembersConversation
);

export default router;

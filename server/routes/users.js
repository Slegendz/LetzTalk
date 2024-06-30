import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Get Friends */
router.get("/:id", verifyJWT, getUser);
router.get("/:id/friends", verifyJWT, getUserFriends);

/* Update the friend or remove them */
router.patch("/:id/:friendId", verifyJWT, addRemoveFriends);
export default router;
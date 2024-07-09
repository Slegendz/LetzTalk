import express from "express";
import { getFeedPosts, getUserPosts, likePosts, postComment, getComments, updatePostUser, getUserPost } from "../controllers/posts.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Reading the data for posts */
router.get("/", verifyJWT, getFeedPosts);
router.get("/:userId/posts", verifyJWT, getUserPosts);
router.get("/:id", verifyJWT, getUserPost);
router.patch("/updatePostUser", verifyJWT, updatePostUser);

/* Updating the like */
router.patch("/:id/like", verifyJWT, likePosts);

router.route("/:id/comment", verifyJWT)
    .get(getComments)           // redundant (For now)
    .post(postComment)
    // .delete(deleteComment)
    // .patch(editComment)

// router.patch("/:id/comment/:commentId/like", verifyJWT, likeComments);

export default router;
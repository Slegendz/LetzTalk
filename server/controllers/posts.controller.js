import Post from "../models/posts.model.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

const createUserPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found " });
    }

    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      location: user.location,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, clipPath, audioPath } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found " });
    }

    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      picturePath,
      audioPath,
      clipPath,
      userPicturePath: user.picturePath,
      location: user.location,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(post); // Created something
  } catch (err) {
    res.status(409).json({ message: err.message }); // Error while creating
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts); // Readed successfully
  } catch (err) {
    res.status(404).json({ message: err.message }); // Not found
  }
};

// Get User single Post
const getUserPost = async (req, res) => {
  try {
    const { id } = req.params; // PostId
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(posts); // Readed successfully
  } catch (err) {
    res.status(404).json({ message: err.message }); // Not found
  }
};

const likePosts = async (req, res) => {
  try {
    const { id } = req.params; // postId
    const { userId } = req.body;

    const posts = await Post.findById(id);
    const isLiked = posts.likes.get(userId);

    // Deletes if it exists else sets it.
    if (isLiked) {
      posts.likes.delete(userId);
    } else {
      posts.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: posts.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const postComment = async (req, res) => {
  try {
    const { id } = req.params; // postId
    const { userId, comment } = req.body;

    if (!userId || !comment) {
      return res
        .status(400)
        .json({ message: "Missing userId or comment content." });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userDetails = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      picturePath: user.picturePath,
    };

    const newComment = {
      content: comment,
      user: userDetails,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getComments = async (req, res) => {
  const { id } = req.params; // PostId for which to get comment

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "No post with this id exist" });
    }

    res.status(200).json({ comments: post.comments });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  likePosts,
  getUserPosts,
  getUserPost,
  getFeedPosts,
  createPost,
  createUserPost,
  postComment,
  getComments,
};

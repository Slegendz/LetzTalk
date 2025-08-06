import mongoose from "mongoose";
const { Schema, model }  = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      requrired: true,
    },
    location: String,
    description: String,
    picturePath: {
      type: String,
      default: "",
    },
    userPicturePath: String,
    audioPath: {
      type: String,
      default: "",
    },
    clipPath: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;

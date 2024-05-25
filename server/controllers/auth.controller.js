import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/fileUpload.js";

/* Register User */

// Async as we are making a call to mongodb so it will take time and we are passing response and request from server.
export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    friends,
    occupation,
    location,
    lastOnline,
  } = req.body;

  const { picture, coverImage } = req.files;

  const picturePath = await uploadOnCloudinary(picture[0].path);
  const coverImagePath = coverImage ? await uploadOnCloudinary(coverImage[0].path) : "";

  try {
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      picturePath,
      friends,
      location,
      occupation,
      coverImagePath,
      lastOnline,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    // Save newuser and respond
    const result = await newUser.save();

    // sending 201 means something is created so we are sending result.
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Not pissib"});
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Using findOne method to find User email in mongoose
    const user = await User.findOne({ email: email });

    // Bad request status 400
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Passing in id and jwt secret to token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // so that the password does not get returned to the frontend
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default login;

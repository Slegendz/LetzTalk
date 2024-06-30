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
  const coverImagePath = coverImage
    ? await uploadOnCloudinary(coverImage[0].path)
    : "";

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
      refreshToken: "",
      lastOnline,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    // Save newuser and respond
    const result = await newUser.save();

    // sending 201 means something is created so we are sending result.
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Not pissib" });
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
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // if(user.refreshToken !== ""){
    //   return res.status(403).json({ message: "Already logged in to another device"});
    // }

    // Passing in id and jwt secret to token with expiry
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    // so that the password does not get returned to the frontend
    delete user.password;
    await user.save();

    console.log("Cookie created");

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure : false,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    console.log("Successful");

    res.status(200).json({ accessToken, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findOne({
          _id: decoded.id,
        });

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          { id: foundUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          // { expiresIn: "1d" }
        );

        res.json(accessToken);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
    try {
      const { id } = req.params;
      const cookies = req.cookies;
      const timeStamp = new Date().toISOString()

      const foundUser = await User.findOne({ _id: id });

      foundUser.lastOnline = timeStamp;
      foundUser.refreshToken = "";
      await foundUser.save();

      if (!cookies?.jwt){
        return res.status(200).json({ message: "User updated. No cookie existed." }); 
      }
    
      res.clearCookie("jwt", { httpOnly: true });
      res.status(200).json({ message: "Cookie cleared and user updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export { login, refresh, logout };

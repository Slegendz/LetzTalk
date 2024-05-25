import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import connectDb from "./db/dbConn.js";
import { register } from "./controllers/auth.controller.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import messageRoutes from "./routes/message.js";
import conversationRoutes from "./routes/conversation.js";

import { Server } from "socket.io";

// Used to properly set the path when we configure directories
import path from "path";
import { fileURLToPath } from "url";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { createPost, createUserPost } from "./controllers/posts.controller.js";

/* Configuration */

const __filename = fileURLToPath(import.meta.url); // getting filename only when we use type:module
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;

dotenv.config();
const app = express();

// Connected to Database
connectDb();

app.use(express.json()); // It parses incoming requests with JSON payloads (POST)
app.use(express.urlencoded({ extended: true }));

// Using helmet to secure our backend http requests (contains 15 sub express middlewares)
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// This line adds Morgan middleware to log HTTP requests. Morgan is a popular logging middleware for Node.js applications. In this line, it's configured to log requests using the "common" predefined format, which includes the IP address, HTTP method, status code, response size, and response time.
app.use(morgan("common"));

// To parse the body requests (Limit is set to 30mb and extended parameter specifies whether or not the middleware will parse the request body using extended regex)

// Limit is set to 30mb as we will send photos and videos request to the server
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Storing assets locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File storage */

// Storing the user images and data locally in assets folder with filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); // anytime we need to upload the file we will call upload and it will store the file in storage

app.get("/", (req, res) => {
  res.send("Server is running.");
});

/* Routes with Files */

// It will upload the single picture using upload middleware when we will visit the register route. we are not making route for this because of upload middleware.
app.post(
  "/auth/register",
  upload.fields([{ name: "picture" }, { name: "coverImage" }]),
  register
); // Name of the fields which we want to upload
app.post(
  "/posts",
  verifyJWT,
  upload.fields([{ name: "picture" }, { name: "audio" }, { name: "clip" }]),
  createPost
);
app.post(
  "/posts/profile",
  verifyJWT,
  upload.fields([{ name: "picture" }, { name: "audio" }, { name: "clip" }]),
  createUserPost
);

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/messages", messageRoutes);
app.use("/conversations", conversationRoutes);

const expressServer = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

const io = new Server(expressServer, {
  cors: {
    // origin: "https://letztalkchat.netlify.app",
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(users);
};

const getUsers = (userId) => {
  const findUser = users.find((user) => user.userId === userId);
  console.log("ITS getUsers");
  console.log(findUser);
  return findUser;
};

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Takes userId and socketId from User
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("activity", (receiverId) => {
    const user = getUsers(receiverId);
    console.log(user);

    if (user) {
      io.to(user.socketId).emit("userActivity");
    }
  });

  // Send message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUsers(receiverId);

    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("logout", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

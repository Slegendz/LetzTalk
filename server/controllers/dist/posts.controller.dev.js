"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostUser = exports.getComments = exports.postComment = exports.createUserPost = exports.createPost = exports.getFeedPosts = exports.getUserPost = exports.getUserPosts = exports.likePosts = void 0;

var _postsModel = _interopRequireDefault(require("../models/posts.model.js"));

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _fileUpload = _interopRequireDefault(require("../utils/fileUpload.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createUserPost = function createUserPost(req, res) {
  var _req$body, userId, description, _req$files, picture, clip, audio, user, picturePath, audioPath, clipPath, newPost, posts;

  return regeneratorRuntime.async(function createUserPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userId = _req$body.userId, description = _req$body.description;
          _req$files = req.files, picture = _req$files.picture, clip = _req$files.clip, audio = _req$files.audio;
          _context.next = 5;
          return regeneratorRuntime.awrap(_userModel["default"].findById(userId));

        case 5:
          user = _context.sent;

          if (!user) {
            res.status(404).json({
              message: "User not found "
            });
          }

          if (!picture) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap((0, _fileUpload["default"])(picture[0].path));

        case 10:
          _context.t0 = _context.sent;
          _context.next = 14;
          break;

        case 13:
          _context.t0 = "";

        case 14:
          picturePath = _context.t0;

          if (!audio) {
            _context.next = 21;
            break;
          }

          _context.next = 18;
          return regeneratorRuntime.awrap((0, _fileUpload["default"])(audio[0].path));

        case 18:
          _context.t1 = _context.sent;
          _context.next = 22;
          break;

        case 21:
          _context.t1 = "";

        case 22:
          audioPath = _context.t1;

          if (!clip) {
            _context.next = 29;
            break;
          }

          _context.next = 26;
          return regeneratorRuntime.awrap((0, _fileUpload["default"])(clip[0].path));

        case 26:
          _context.t2 = _context.sent;
          _context.next = 30;
          break;

        case 29:
          _context.t2 = "";

        case 30:
          clipPath = _context.t2;
          _context.next = 33;
          return regeneratorRuntime.awrap(_postsModel["default"].create({
            userId: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description: description,
            picturePath: picturePath,
            audioPath: audioPath,
            clipPath: clipPath,
            userPicturePath: user.picturePath,
            location: user.location,
            likes: {},
            comments: []
          }));

        case 33:
          newPost = _context.sent;
          _context.next = 36;
          return regeneratorRuntime.awrap(newPost.save());

        case 36:
          _context.next = 38;
          return regeneratorRuntime.awrap(_postsModel["default"].find({
            userId: userId
          }).sort({
            createdAt: -1
          }));

        case 38:
          posts = _context.sent;
          res.status(200).json({
            posts: posts,
            newPost: newPost
          });
          _context.next = 45;
          break;

        case 42:
          _context.prev = 42;
          _context.t3 = _context["catch"](0);
          res.status(500).json({
            message: _context.t3.message
          });

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 42]]);
};

exports.createUserPost = createUserPost;

var createPost = function createPost(req, res) {
  var _req$body2, userId, description, user, _req$files2, picture, clip, audio, picturePath, audioPath, clipPath, newPost, posts;

  return regeneratorRuntime.async(function createPost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, userId = _req$body2.userId, description = _req$body2.description;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(userId));

        case 4:
          user = _context2.sent;
          _req$files2 = req.files, picture = _req$files2.picture, clip = _req$files2.clip, audio = _req$files2.audio;

          if (!user) {
            res.status(404).json({
              message: "User not found "
            });
          }

          if (!picture) {
            _context2.next = 13;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap((0, _fileUpload["default"])(picture[0].path));

        case 10:
          _context2.t0 = _context2.sent;
          _context2.next = 14;
          break;

        case 13:
          _context2.t0 = "";

        case 14:
          picturePath = _context2.t0;

          if (!audio) {
            _context2.next = 21;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap((0, _fileUpload["default"])(audio[0].path));

        case 18:
          _context2.t1 = _context2.sent;
          _context2.next = 22;
          break;

        case 21:
          _context2.t1 = "";

        case 22:
          audioPath = _context2.t1;

          if (!clip) {
            _context2.next = 29;
            break;
          }

          _context2.next = 26;
          return regeneratorRuntime.awrap((0, _fileUpload["default"])(clip[0].path));

        case 26:
          _context2.t2 = _context2.sent;
          _context2.next = 30;
          break;

        case 29:
          _context2.t2 = "";

        case 30:
          clipPath = _context2.t2;
          _context2.next = 33;
          return regeneratorRuntime.awrap(_postsModel["default"].create({
            userId: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description: description,
            picturePath: picturePath,
            audioPath: audioPath,
            clipPath: clipPath,
            userPicturePath: user.picturePath,
            location: user.location,
            likes: {},
            comments: []
          }));

        case 33:
          newPost = _context2.sent;
          _context2.next = 36;
          return regeneratorRuntime.awrap(newPost.save());

        case 36:
          _context2.next = 38;
          return regeneratorRuntime.awrap(_postsModel["default"].find().sort({
            createdAt: -1
          }));

        case 38:
          posts = _context2.sent;
          res.status(201).json({
            posts: posts,
            newPost: newPost
          }); // Created something

          _context2.next = 45;
          break;

        case 42:
          _context2.prev = 42;
          _context2.t3 = _context2["catch"](0);
          res.status(409).json({
            message: _context2.t3.message
          }); // Error while creating

        case 45:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 42]]);
};

exports.createPost = createPost;

var getFeedPosts = function getFeedPosts(req, res) {
  var page, limitValue, skipValue, posts;
  return regeneratorRuntime.async(function getFeedPosts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          page = parseInt(req.query.page) || 1;
          limitValue = parseInt(req.query.limit) || 5;
          skipValue = (page - 1) * limitValue;
          _context3.next = 6;
          return regeneratorRuntime.awrap(_postsModel["default"].find().limit(limitValue).skip(skipValue).sort({
            createdAt: -1
          }));

        case 6:
          posts = _context3.sent;
          res.status(200).json(posts); // Readed successfully

          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(404).json({
            message: _context3.t0.message
          }); // Not found

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Get User single Post


exports.getFeedPosts = getFeedPosts;

var getUserPost = function getUserPost(req, res) {
  var id, post;
  return regeneratorRuntime.async(function getUserPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id; // PostId

          _context4.next = 4;
          return regeneratorRuntime.awrap(_postsModel["default"].findById(id));

        case 4:
          post = _context4.sent;

          if (!post) {
            res.status(404).json({
              message: "Post not found"
            });
          }

          res.status(200).json(post);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            message: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getUserPost = getUserPost;

var getUserPosts = function getUserPosts(req, res) {
  var userId, page, limitValue, skipValue, posts;
  return regeneratorRuntime.async(function getUserPosts$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.params.userId;
          page = parseInt(req.query.page) || 1;
          limitValue = parseInt(req.query.limit) || 5;
          skipValue = (page - 1) * limitValue;
          _context5.next = 7;
          return regeneratorRuntime.awrap(_postsModel["default"].find({
            userId: userId
          }).limit(limitValue).skip(skipValue).sort({
            createdAt: -1
          }));

        case 7:
          posts = _context5.sent;
          res.status(200).json(posts); // Readed successfully

          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.status(404).json({
            message: _context5.t0.message
          }); // Not found

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getUserPosts = getUserPosts;

var likePosts = function likePosts(req, res) {
  var id, userId, posts, isLiked, updatedPost;
  return regeneratorRuntime.async(function likePosts$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id; // postId

          userId = req.body.userId;
          _context6.next = 5;
          return regeneratorRuntime.awrap(_postsModel["default"].findById(id));

        case 5:
          posts = _context6.sent;
          isLiked = posts.likes.get(userId); // Deletes if it exists else sets it.

          if (isLiked) {
            posts.likes["delete"](userId);
          } else {
            posts.likes.set(userId, true);
          }

          _context6.next = 10;
          return regeneratorRuntime.awrap(_postsModel["default"].findByIdAndUpdate(id, {
            likes: posts.likes
          }, {
            "new": true
          }));

        case 10:
          updatedPost = _context6.sent;
          res.status(200).json(updatedPost);
          _context6.next = 17;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          res.status(404).json({
            message: _context6.t0.message
          });

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.likePosts = likePosts;

var postComment = function postComment(req, res) {
  var id, _req$body3, userId, comment, post, user, userDetails, newComment;

  return regeneratorRuntime.async(function postComment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          id = req.params.id; // postId

          _req$body3 = req.body, userId = _req$body3.userId, comment = _req$body3.comment;

          if (!(!userId || !comment)) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            message: "Missing userId or comment content."
          }));

        case 5:
          _context7.next = 7;
          return regeneratorRuntime.awrap(_postsModel["default"].findById(id));

        case 7:
          post = _context7.sent;

          if (post) {
            _context7.next = 10;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "Post not found."
          }));

        case 10:
          _context7.next = 12;
          return regeneratorRuntime.awrap(_userModel["default"].findById(userId));

        case 12:
          user = _context7.sent;

          if (user) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "User not found."
          }));

        case 15:
          userDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
            picturePath: user.picturePath
          };
          newComment = {
            content: comment,
            user: userDetails,
            createdAt: new Date()
          };
          post.comments.push(newComment);
          _context7.next = 20;
          return regeneratorRuntime.awrap(post.save());

        case 20:
          res.status(201).json(post);
          _context7.next = 26;
          break;

        case 23:
          _context7.prev = 23;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: _context7.t0.message
          });

        case 26:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

exports.postComment = postComment;

var getComments = function getComments(req, res) {
  var id, post;
  return regeneratorRuntime.async(function getComments$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id; // PostId for which to get comment

          _context8.next = 4;
          return regeneratorRuntime.awrap(_postsModel["default"].findById(id));

        case 4:
          post = _context8.sent;

          if (!post) {
            res.status(404).json({
              message: "No post with this id exist"
            });
          }

          res.status(200).json({
            comments: post.comments
          });
          _context8.next = 12;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            message: _context8.t0.message
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getComments = getComments;

var updatePostUser = function updatePostUser(req, res) {
  var _req$body4, firstName, lastName, location, userId, userPicturePath, posts, i, feedPosts;

  return regeneratorRuntime.async(function updatePostUser$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body4 = req.body, firstName = _req$body4.firstName, lastName = _req$body4.lastName, location = _req$body4.location, userId = _req$body4.userId, userPicturePath = _req$body4.userPicturePath;
          _context9.next = 4;
          return regeneratorRuntime.awrap(_postsModel["default"].find({
            userId: userId
          }));

        case 4:
          posts = _context9.sent;

          if (!(!posts || posts.length === 0)) {
            _context9.next = 7;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            message: "Posts not found"
          }));

        case 7:
          i = 0;

        case 8:
          if (!(i < posts.length)) {
            _context9.next = 18;
            break;
          }

          if (firstName) posts[i].firstName = firstName;
          if (lastName) posts[i].lastName = lastName;
          if (location) posts[i].location = location;
          if (userPicturePath) posts[i].userPicturePath = userPicturePath;
          _context9.next = 15;
          return regeneratorRuntime.awrap(posts[i].save());

        case 15:
          i++;
          _context9.next = 8;
          break;

        case 18:
          _context9.next = 20;
          return regeneratorRuntime.awrap(_postsModel["default"].find().sort({
            createdAt: -1
          }));

        case 20:
          feedPosts = _context9.sent;
          res.status(200).json(feedPosts);
          _context9.next = 27;
          break;

        case 24:
          _context9.prev = 24;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            error: _context9.t0.message
          });

        case 27:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 24]]);
};

exports.updatePostUser = updatePostUser;
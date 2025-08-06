"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model;
var postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  description: String,
  picturePath: {
    type: String,
    "default": ""
  },
  audioPath: {
    type: String,
    "default": ""
  },
  clipPath: {
    type: String,
    "default": ""
  },
  likes: {
    type: Map,
    of: Boolean
  },
  comments: {
    type: Array,
    "default": []
  }
}, {
  timestamps: true
});
var Post = model("Post", postSchema);
var _default = Post;
exports["default"] = _default;
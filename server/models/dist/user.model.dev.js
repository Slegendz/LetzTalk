"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model;
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  picturePath: {
    type: String,
    "default": ""
  },
  coverImagePath: {
    type: String,
    "default": ""
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  lastOnline: {
    type: Date,
    "default": Date.now,
    index: true
  },
  occupation: String,
  location: String,
  impressions: {
    type: Number,
    "default": 0
  },
  viewedProfile: {
    type: Number,
    "default": 0
  },
  refreshToken: String,
  twitterUrl: {
    type: String,
    "default": ""
  },
  instagramUrl: {
    type: String,
    "default": ""
  },
  linkedinUrl: {
    type: String,
    "default": ""
  }
}, {
  timestamps: true
});
var User = model("User", userSchema);
var _default = User;
exports["default"] = _default;
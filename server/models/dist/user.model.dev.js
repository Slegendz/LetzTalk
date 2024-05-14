"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
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
  friends: {
    type: Array,
    "default": []
  },
  lastOnline: {
    type: String,
    "default": ""
  },
  occupation: String,
  location: String,
  impressions: Number,
  viewedProfile: Number
}, {
  timestamps: true
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;
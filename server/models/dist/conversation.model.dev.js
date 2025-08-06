"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model;
var conversationSchema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }]
}, {
  timestamps: true
});
conversationSchema.index({
  members: 1
});
conversationSchema.index(_defineProperty({
  members: 1
}, "members", -1), {
  unique: true
});
var Conversation = model("Conversation", conversationSchema);
var _default = Conversation;
exports["default"] = _default;
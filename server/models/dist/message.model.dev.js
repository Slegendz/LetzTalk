"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model; // Messages send

var messageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    required: true,
    type: String,
    trim: true
  }
}, {
  timestamps: true
});
messageSchema.index({
  conversationId: 1
});
messageSchema.index({
  senderId: 1
});
var Message = model("Message", messageSchema);
var _default = Message;
exports["default"] = _default;
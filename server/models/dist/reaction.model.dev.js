"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model;
var ReactionSchema = new Schema({
  targetId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  targetType: {
    type: Schema.Types.ObjectId,
    "enum": ["Post", "Status"],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  type: {
    type: String,
    // enum: ["thumbsUp", "love", "haha", "sad", "angry", "clap"],
    required: true
  }
}, {
  timestamps: true
});
var Reaction = model("Reaction", ReactionSchema);
var _default = Reaction;
exports["default"] = _default;
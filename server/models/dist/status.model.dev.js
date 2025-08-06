"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema,
    model = _mongoose["default"].model;
var StatusSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true
  },
  statusPath: {
    type: String,
    "default": ""
  },
  message: {
    type: String,
    "default": ""
  },
  likes: {
    type: Map,
    of: Boolean
  },
  seen: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    seenAt: {
      type: Date,
      "default": Date.now
    }
  }]
}, {
  timeStamps: true
});
StatusSchema.index({
  createdAt: 1
}, {
  expireAfterSeconds: 5
});
var Status = model("Status", StatusSchema);
var _default = Status;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _conversationModel = _interopRequireDefault(require("../../../Chat-App/api/models/conversation.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // The $set operator is used to update documents by setting a field to a new value. This can be used to update existing fields or add new ones. In your example, the $set operator isn't explicitly mentioned, but it's commonly used in update operations with MongoDB and Mongoose
//new conv


router.post("/", function _callee(req, res) {
  var _req$body, senderId, receiverId, newConversation, savedConversation;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, senderId = _req$body.senderId, receiverId = _req$body.receiverId;
          newConversation = new _conversationModel["default"]({
            members: [senderId, receiverId]
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(newConversation.save());

        case 5:
          savedConversation = _context.sent;
          res.status(200).json(savedConversation);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.status(500).json(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); //get conv of a user
// The $in operator is used to find documents where a specified field's value is within a given list of values.

router.get("/:userId", function _callee2(req, res) {
  var userId, conversation;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.params.userId;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_conversationModel["default"].find({
            members: {
              $in: [userId]
            }
          }));

        case 4:
          conversation = _context2.sent;
          res.status(200).json(conversation);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // get conv includes two userId
// The $all operator is used to find documents where an array field contains all specified elements, regardless of order.

router.get("/find/:firstUserId/:secondUserId", function _callee3(req, res) {
  var _req$params, firstUserId, secondUserId, conversation;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$params = req.params, firstUserId = _req$params.firstUserId, secondUserId = _req$params.secondUserId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_conversationModel["default"].findOne({
            members: {
              $all: [firstUserId, secondUserId]
            }
          }));

        case 4:
          conversation = _context3.sent;
          res.status(200).json(conversation);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json(_context3.t0);

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
var _default = router;
exports["default"] = _default;
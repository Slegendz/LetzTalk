"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newConversation = exports.getConversation = exports.getMembersConversation = void 0;

var _conversationModel = _interopRequireDefault(require("../models/conversation.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The $set operator is used to update documents by setting a field to a new value. This can be used to update existing fields or add new ones. In your example, the $set operator isn't explicitly mentioned, but it's commonly used in update operations with MongoDB and Mongoose
// New Conversation
var newConversation = function newConversation(req, res) {
  var _req$body, senderId, receiverId, existingConversation, _newConversation, savedConversation;

  return regeneratorRuntime.async(function newConversation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, senderId = _req$body.senderId, receiverId = _req$body.receiverId;
          _context.next = 4;
          return regeneratorRuntime.awrap(_conversationModel["default"].findOne({
            members: {
              $all: [senderId, receiverId]
            }
          }));

        case 4:
          existingConversation = _context.sent;

          if (!existingConversation) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(200).json(existingConversation));

        case 7:
          _newConversation = new _conversationModel["default"]({
            members: [senderId, receiverId]
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(_newConversation.save());

        case 10:
          savedConversation = _context.sent;
          res.status(200).json(savedConversation);
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}; // The $in operator is used to find documents where a specified field's value is within a given list of values.
// Get Conversation of the user


exports.newConversation = newConversation;

var getConversation = function getConversation(req, res) {
  var userId, conversations;
  return regeneratorRuntime.async(function getConversation$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.userId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_conversationModel["default"].find({
            members: {
              $in: [userId]
            }
          }));

        case 4:
          conversations = _context2.sent;

          if (conversations.length) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "No conversations found"
          }));

        case 7:
          res.status(200).json(conversations);
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Get converation of two members
// The $all operator is used to find documents where an array field contains all specified elements, regardless of order.


exports.getConversation = getConversation;

var getMembersConversation = function getMembersConversation(req, res) {
  var _req$params, firstUserId, secondUserId, conversation;

  return regeneratorRuntime.async(function getMembersConversation$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$params = req.params, firstUserId = _req$params.firstUserId, secondUserId = _req$params.secondUserId;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_conversationModel["default"].findOne({
            members: {
              $all: [firstUserId, secondUserId]
            }
          }));

        case 4:
          conversation = _context3.sent;

          if (conversation) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Conversation not found"
          }));

        case 7:
          res.status(200).json(conversation);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getMembersConversation = getMembersConversation;
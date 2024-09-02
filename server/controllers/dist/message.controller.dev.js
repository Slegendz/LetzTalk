"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPrompt = exports.getMessage = exports.postMessage = void 0;

var _messageModel = _interopRequireDefault(require("../models/message.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postMessage = function postMessage(req, res) {
  var _req$body, conversationId, senderId, text, newMessage;

  return regeneratorRuntime.async(function postMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, conversationId = _req$body.conversationId, senderId = _req$body.senderId, text = _req$body.text;
          newMessage = new _messageModel["default"]({
            conversationId: conversationId,
            senderId: senderId,
            text: text
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(newMessage.save());

        case 5:
          res.status(200).json(newMessage);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.postMessage = postMessage;

var getMessage = function getMessage(req, res) {
  var conversationId, messages;
  return regeneratorRuntime.async(function getMessage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          conversationId = req.params.conversationId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_messageModel["default"].find({
            conversationId: conversationId
          }));

        case 4:
          messages = _context2.sent;
          res.status(200).json(messages);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getMessage = getMessage;

var postPrompt = function postPrompt(req, res) {
  var _req$body2, conversationId, senderId, text, newMessage;

  return regeneratorRuntime.async(function postPrompt$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, conversationId = _req$body2.conversationId, senderId = _req$body2.senderId, text = _req$body2.text;
          newMessage = new _messageModel["default"]({
            conversationId: conversationId,
            senderId: senderId,
            text: text
          });
          _context3.next = 5;
          return regeneratorRuntime.awrap(newMessage.save());

        case 5:
          // res.status(200).json(newMessage);
          console.log(data);
          res.send(data);
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error("Error:", _context3.t0.message);
          res.status(500).send("Internal Server Error");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.postPrompt = postPrompt;
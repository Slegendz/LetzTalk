"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _messageModel = _interopRequireDefault(require("../models/message.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

// add 
router.post("/", function _callee(req, res) {
  var newMessage, savedMessage;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newMessage = new _messageModel["default"](req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(newMessage.save());

        case 4:
          savedMessage = _context.sent;
          res.status(200).json(savedMessage);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //get

router.get("/:conversationId", function _callee2(req, res) {
  var messages;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_messageModel["default"].find({
            conversationId: req.params.conversationId
          }));

        case 3:
          messages = _context2.sent;
          res.status(200).json(messages);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var _default = router;
exports["default"] = _default;
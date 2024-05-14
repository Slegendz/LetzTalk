"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRemoveFriends = exports.getUserFriends = exports.updateUser = exports.getUser = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUser = function getUser(req, res) {
  var id, user;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.params.id; // gettting id from the url

          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id));

        case 4:
          user = _context.sent;
          // finding the user by id
          res.status(200).json(user);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getUser = getUser;

var updateUser = function updateUser(req, res) {
  var id, lastOnline, user;
  return regeneratorRuntime.async(function updateUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          lastOnline = req.body.lastOnline;
          console.log(req.body);
          _context2.next = 6;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 9:
          user.lastOnline = lastOnline;
          _context2.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(200).json({
            message: "User updated",
            user: user
          });
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

exports.updateUser = updateUser;

var getUserFriends = function getUserFriends(req, res) {
  var id, user, friends, formattedFriends;
  return regeneratorRuntime.async(function getUserFriends$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id));

        case 4:
          user = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(Promise.all(user.friends.map(function (id) {
            return _userModel["default"].findById(id);
          })));

        case 7:
          friends = _context3.sent;
          formattedFriends = friends.map(function (_ref) {
            var _id = _ref._id,
                firstName = _ref.firstName,
                lastName = _ref.lastName,
                occupation = _ref.occupation,
                location = _ref.location,
                picturePath = _ref.picturePath,
                lastOnline = _ref.lastOnline;
            return {
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              occupation: occupation,
              location: location,
              picturePath: picturePath,
              lastOnline: lastOnline
            };
          });
          res.status(200).json(formattedFriends);
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          res.status(404).json({
            error: _context3.t0.message
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getUserFriends = getUserFriends;

var addRemoveFriends = function addRemoveFriends(req, res) {
  var _req$params, id, friendId, user, friend, friends, formattedFriends;

  return regeneratorRuntime.async(function addRemoveFriends$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$params = req.params, id = _req$params.id, friendId = _req$params.friendId;
          _context4.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id));

        case 4:
          user = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(_userModel["default"].findById(friendId));

        case 7:
          friend = _context4.sent;

          if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(function (id) {
              return id !== friendId;
            });
            friend.friends = friend.friends.filter(function (id) {
              return id !== id;
            });
          } else {
            user.friends.push(friendId);
            friend.friends.push(id);
          }

          _context4.next = 11;
          return regeneratorRuntime.awrap(user.save());

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(friend.save());

        case 13:
          _context4.next = 15;
          return regeneratorRuntime.awrap(Promise.all(user.friends.map(function (id) {
            return _userModel["default"].findById(id);
          })));

        case 15:
          friends = _context4.sent;
          formattedFriends = friends.map(function (_ref2) {
            var _id = _ref2._id,
                firstName = _ref2.firstName,
                lastName = _ref2.lastName,
                occupation = _ref2.occupation,
                location = _ref2.location,
                picturePath = _ref2.picturePath,
                lastOnline = _ref2.lastOnline;
            return {
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              occupation: occupation,
              location: location,
              picturePath: picturePath,
              lastOnline: lastOnline
            };
          });
          res.status(200).json(formattedFriends);
          _context4.next = 23;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          res.status(404).json({
            error: _context4.t0.message
          });

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.addRemoveFriends = addRemoveFriends;
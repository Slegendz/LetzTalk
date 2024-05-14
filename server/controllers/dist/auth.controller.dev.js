"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.register = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* Register User */
// Async as we are making a call to mongodb so it will take time and we are passing response and request from server.
var register = function register(req, res) {
  var _req$body, firstName, lastName, email, password, picturePath, friends, occupation, location, coverImagePath, lastOnline, salt, hashedPwd, newUser, result;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, picturePath = _req$body.picturePath, friends = _req$body.friends, occupation = _req$body.occupation, location = _req$body.location, coverImagePath = _req$body.coverImagePath, lastOnline = _req$body.lastOnline;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt());

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

        case 7:
          hashedPwd = _context.sent;
          newUser = new _userModel["default"]({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPwd,
            picturePath: picturePath,
            friends: friends,
            location: location,
            occupation: occupation,
            coverImagePath: coverImagePath,
            lastOnline: lastOnline,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
          }); // Save newuser and respond

          _context.next = 11;
          return regeneratorRuntime.awrap(newUser.save());

        case 11:
          result = _context.sent;
          // sending 201 means something is created so we are sending result.
          res.status(201).json(result);
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

exports.register = register;

var login = function login(req, res) {
  var _req$body2, email, password, user, isMatch, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: "User does not exist"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            msg: "Invalid credentials"
          }));

        case 12:
          // Passing in id and jwt secret to token
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET); // so that the password does not get returned to the frontend

          delete user.password;
          res.status(200).json({
            token: token,
            user: user
          });
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

var _default = login;
exports["default"] = _default;
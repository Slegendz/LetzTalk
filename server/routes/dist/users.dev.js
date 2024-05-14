"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/user.controller.js");

var _authMiddleware = require("../middlewares/auth.middleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* Get Friends */


router.get("/:id", _authMiddleware.verifyJWT, _userController.getUser);
router.get("/:id/friends", _authMiddleware.verifyJWT, _userController.getUserFriends);
router.patch("/updateUser/:id", _authMiddleware.verifyJWT, _userController.updateUser);
/* Update the friend or remove them */

router.patch("/:id/:friendId", _authMiddleware.verifyJWT, _userController.addRemoveFriends);
var _default = router;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("./middlewares/ensureAuthenticated"));

var _UserController = _interopRequireDefault(require("./controllers/UserController"));

var _AuthController = _interopRequireDefault(require("./controllers/AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const authController = new _AuthController.default();
const userController = new _UserController.default();
routes.post('/signin', authController.create);
routes.post('/signup', userController.create);
routes.get('/users/:user_id', _ensureAuthenticated.default, userController.index);
var _default = routes;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AuthService = _interopRequireDefault(require("../services/AuthService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  async create(request, response) {
    try {
      const {
        email,
        senha
      } = request.body;

      const authService = _tsyringe.container.resolve(_AuthService.default);

      const user = await authService.create({
        email,
        senha
      });
      return response.json(user);
    } catch (error) {
      return response.status(400).json({
        mensagem: error.message
      });
    }
  }

}

exports.default = AuthController;
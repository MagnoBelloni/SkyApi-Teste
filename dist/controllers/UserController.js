"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _UserService = _interopRequireDefault(require("../services/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(request, response) {
    try {
      const {
        nome,
        email,
        senha,
        telefones
      } = request.body;

      const userService = _tsyringe.container.resolve(_UserService.default);

      const user = await userService.create({
        nome,
        email,
        senha,
        telefones
      });
      return response.json(user);
    } catch (error) {
      return response.status(400).json({
        mensagem: error.message
      });
    }
  }

  async index(request, response) {
    try {
      const {
        user_id
      } = request.params;
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new _AppError.default('Não Autorizado', 401);
      }

      const [, token] = authHeader.split(' ');

      const userService = _tsyringe.container.resolve(_UserService.default);

      const user = await userService.index({
        user_id,
        token
      });
      return response.json(user);
    } catch (error) {
      return response.status(400).json({
        mensagem: error.message
      });
    }
  }

}

exports.default = UserController;
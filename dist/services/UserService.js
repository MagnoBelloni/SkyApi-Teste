"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _bcryptjs = require("bcryptjs");

var _dateFns = require("date-fns");

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _auth = _interopRequireDefault(require("../config/auth"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async index({
    user_id,
    token
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User ID inexistente');
    }

    if (token !== user.token) {
      throw new _AppError.default('Não autorizado', 401);
    }

    if ((0, _dateFns.differenceInMinutes)(user.ultimo_login, new Date()) > 30) {
      throw new _AppError.default('Sessão inválida', 401);
    }

    return user;
  }

  async create({
    nome,
    email,
    senha,
    telefones
  }) {
    if (!nome || !email || !senha || !telefones) {
      throw new _AppError.default('Falta parametros no corpo da requisição!!');
    }

    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new _AppError.default('E-mail já cadastrado!!');
    }

    const hashedPassword = await (0, _bcryptjs.hash)(senha, 8);
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: email,
      expiresIn
    });
    const user = await this.usersRepository.create({
      nome,
      email,
      senha: hashedPassword,
      telefones,
      token,
      ultimo_login: new Date()
    });
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UserService;
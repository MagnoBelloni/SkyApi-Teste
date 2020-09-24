"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../schemas/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_User.default);
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create({
    nome,
    email,
    senha,
    telefones,
    token,
    ultimo_login
  }) {
    const user = await this.ormRepository.create({
      nome,
      email,
      senha,
      telefones,
      token,
      ultimo_login
    });
    await this.ormRepository.save(user);
    return user;
  }

  save(user) {
    return this.ormRepository.save(user);
  }

}

exports.default = UsersRepository;
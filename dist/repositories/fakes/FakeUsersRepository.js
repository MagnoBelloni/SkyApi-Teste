"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _User = _interopRequireDefault(require("../../schemas/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async findById(id) {
    const objectid = new _mongodb.ObjectID(id);
    const userById = this.users.find(user => user.id === objectid);
    return userById;
  }

  async findByEmail(email) {
    const userByEmail = this.users.find(user => user.email === email);
    return userByEmail;
  }

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: new _mongodb.ObjectID()
    }, userData);
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;
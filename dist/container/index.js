"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);
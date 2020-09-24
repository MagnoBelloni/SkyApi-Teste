"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default); // container.registerSingleton<IUserTokensRepository>(
//     'UserTokensRepository',
//     UserTokensRepository,
// );
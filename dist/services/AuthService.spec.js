"use strict";

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthService = _interopRequireDefault(require("./AuthService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let authService;
beforeEach(() => {
  fakeUsersRepository = new _FakeUsersRepository.default();
  authService = new _AuthService.default(fakeUsersRepository);
});
describe('AuthenticateUser', () => {
  it('should not be able to authenticate with non existing user', async () => {
    await expect(authService.create({
      email: 'fulano@gmail.com',
      senha: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with a invalid password', async () => {
    await fakeUsersRepository.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123',
      telefones: [{
        ddd: '11',
        numero: '99999999'
      }],
      token: '123',
      ultimo_login: new Date()
    });
    await expect(authService.create({
      email: 'fulano@gmail.com',
      senha: '12345'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});
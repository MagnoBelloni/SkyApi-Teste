"use strict";

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UserService = _interopRequireDefault(require("./UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let userService;
beforeEach(() => {
  fakeUsersRepository = new _FakeUsersRepository.default();
  userService = new _UserService.default(fakeUsersRepository);
});
describe('User', () => {
  it('should be able to create a new user', async () => {
    const user = await userService.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123',
      telefones: [{
        ddd: '11',
        numero: '99999999'
      }]
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with a repeated  email', async () => {
    await userService.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123',
      telefones: [{
        ddd: '11',
        numero: '99999999'
      }]
    });
    await expect(userService.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123',
      telefones: [{
        ddd: '11',
        numero: '99999999'
      }]
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});
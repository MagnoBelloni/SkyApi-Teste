import AppError from '../errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthService from './AuthService';

let fakeUsersRepository: FakeUserRepository;

let authService: AuthService;

beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    authService = new AuthService(fakeUsersRepository);
});

describe('AuthenticateUser', () => {
    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authService.create({
                email: 'fulano@gmail.com',
                senha: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with a invalid password', async () => {
        await fakeUsersRepository.create({
            nome: 'Fulano',
            email: 'fulano@gmail.com',
            senha: '123',
            telefones: [
                {
                    ddd: '11',
                    numero: '99999999',
                },
            ],
            token: '123',
            ultimo_login: new Date(),
        });

        await expect(
            authService.create({
                email: 'fulano@gmail.com',
                senha: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

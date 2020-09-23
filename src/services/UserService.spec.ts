import AppError from '../errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UserService from './UserService';

let fakeUsersRepository: FakeUserRepository;

let userService: UserService;

beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    userService = new UserService(fakeUsersRepository);
});

describe('User', () => {
    it('should be able to create a new user', async () => {
        const user = await userService.create({
            nome: 'Fulano',
            email: 'fulano@gmail.com',
            senha: '123',
            telefones: [
                {
                    ddd: '11',
                    numero: '99999999',
                },
            ],
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with a repeated  email', async () => {
        await userService.create({
            nome: 'Fulano',
            email: 'fulano@gmail.com',
            senha: '123',
            telefones: [
                {
                    ddd: '11',
                    numero: '99999999',
                },
            ],
        });

        await expect(
            userService.create({
                nome: 'Fulano',
                email: 'fulano@gmail.com',
                senha: '123',
                telefones: [
                    {
                        ddd: '11',
                        numero: '99999999',
                    },
                ],
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

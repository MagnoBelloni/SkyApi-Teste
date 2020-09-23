import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { hash, compare } from 'bcryptjs';

import IUsersRepository from 'repositories/IUsersRepository';
import User from 'schemas/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface IRequestSingIn {
    email: string;
    senha: string;
}

@injectable()
export default class AuthService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async create({ email, senha }: IRequestSingIn): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Usuário e/ou senha inválidos', 401);
        }

        const passwordMatched = await compare(senha, user.senha);

        if (!passwordMatched) {
            throw new AppError('Usuário e/ou senha inválidos', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.email,
            expiresIn,
        });

        user.token = token;
        user.ultimo_login = new Date();

        this.usersRepository.save(user);

        return user;
    }
}

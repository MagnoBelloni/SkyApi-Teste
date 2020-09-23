import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import { getMinutes } from 'date-fns';

import IUsersRepository from 'repositories/IUsersRepository';
import User from 'schemas/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface ITelefone {
    numero: string;
    ddd: string;
}

interface IRequestSignUp {
    nome: string;
    email: string;
    senha: string;
    telefones: ITelefone[];
}

interface IRequestUser {
    user_id: string;
    token: string;
}

@injectable()
export default class UserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async index({ user_id, token }: IRequestUser): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User ID inexistente');
        }

        if (token !== user.token) {
            throw new AppError('Não autorizado', 401);
        }

        if (getMinutes(user.ultimo_login) > 30) {
            throw new AppError('Sessão inválida', 401);
        }

        return user;
    }

    public async create({
        nome,
        email,
        senha,
        telefones,
    }: IRequestSignUp): Promise<User> {
        if (!nome || !email || !senha || !telefones) {
            throw new AppError('Falta parametros no corpo da requisição!!');
        }

        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('E-mail já cadastrado!!');
        }

        const hashedPassword = await hash(senha, 8);

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: email,
            expiresIn,
        });

        const user = await this.usersRepository.create({
            nome,
            email,
            senha: hashedPassword,
            telefones,
            token,
            ultimo_login: new Date(),
        });

        return user;
    }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '../errors/AppError';

import UserService from '../services/UserService';

export default class UserController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { nome, email, senha, telefones } = request.body;

            const userService = container.resolve(UserService);

            const user = await userService.create({
                nome,
                email,
                senha,
                telefones,
            });

            return response.json(user);
        } catch (error) {
            return response.status(400).json({ mensagem: error.message });
        }
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { user_id } = request.params;

            const authHeader = request.headers.authorization;

            if (!authHeader) {
                throw new AppError('Não Autorizado', 401);
            }

            const [, token] = authHeader.split(' ');

            const userService = container.resolve(UserService);

            const user = await userService.index({
                user_id,
                token,
            });

            return response.json(user);
        } catch (error) {
            return response.status(400).json({ mensagem: error.message });
        }
    }
}

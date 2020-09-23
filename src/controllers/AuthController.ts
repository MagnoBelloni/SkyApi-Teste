import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthService from '../services/AuthService';

export default class AuthController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { email, senha } = request.body;

            const authService = container.resolve(AuthService);

            const user = await authService.create({
                email,
                senha,
            });

            return response.json(user);
        } catch (error) {
            return response.status(400).json({ mensagem: error.message });
        }
    }
}

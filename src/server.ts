import 'reflect-metadata';

import express, { json, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import AppError from './errors/AppError';
import routes from './routes';

import './database';
import './container';

const app = express();

app.use(cors());
app.use(json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            mensagem: err.message,
        });
    }

    return response.status(500).json({
        mensagem: 'Internal server error',
    });
});

app.use((request: Request, response: Response, _: NextFunction) => {
    response.status(404).json({
        mensagem: 'Rota não encontrada',
    });
});

app.listen(process.env.PORT || 3333, () => {
    console.log('Server started!!');
});

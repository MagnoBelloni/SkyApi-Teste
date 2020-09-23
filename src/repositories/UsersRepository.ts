import { getMongoRepository, MongoRepository } from 'typeorm';

import User from 'schemas/User';
import ICreateUserDTO from 'dtos/ICreateUserDTO';
import IUsersRepository from './IUsersRepository';

export default class UsersRepository implements IUsersRepository {
    private ormRepository: MongoRepository<User>;

    constructor() {
        this.ormRepository = getMongoRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });

        return user;
    }

    public async create({
        nome,
        email,
        senha,
        telefones,
        token,
        ultimo_login,
    }: ICreateUserDTO): Promise<User> {
        const user = await this.ormRepository.create({
            nome,
            email,
            senha,
            telefones,
            token,
            ultimo_login,
        });

        await this.ormRepository.save(user);

        return user;
    }

    save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

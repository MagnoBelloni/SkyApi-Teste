import { ObjectID } from 'mongodb';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../schemas/User';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const objectid = new ObjectID(id);
        const userById = this.users.find(user => user.id === objectid);

        return userById;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userByEmail = this.users.find(user => user.email === email);

        return userByEmail;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: new ObjectID() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;

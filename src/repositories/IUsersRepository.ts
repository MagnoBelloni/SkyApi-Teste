import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../schemas/User';

export default interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(user: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}

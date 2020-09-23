import { container } from 'tsyringe';

import UsersRepository from '../repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

// container.registerSingleton<IUserTokensRepository>(
//     'UserTokensRepository',
//     UserTokensRepository,
// );

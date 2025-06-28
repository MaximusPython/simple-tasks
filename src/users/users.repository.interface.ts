import { UserModel } from '../generated/prisma';
import { UserEntity } from './user.entity';

export interface IUsersRepository {
	create: (user: UserEntity) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}

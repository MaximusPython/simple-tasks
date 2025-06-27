import { IUsersRepository } from './users.repository.interface';
import { UserEntity } from './user.entity';
import { UserModel } from '../generated/prisma';
import { injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';

@injectable()
export class UserRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: UserEntity): Promise<UserModel> {
		return this.prismaService.client.UserModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		// мы берем клииент призмы, берем модель и делаем что хотим с нею, данная модель не относится entity
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	// данный репозиторий работает только с юзерами так лучше делать код
}

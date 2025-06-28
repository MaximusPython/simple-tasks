import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IuserService } from './user.service.interface';
import { UserService } from './user.service';
import { IUsersRepository } from './users.repository.interface';
import { UserModel, User } from '../generated/prisma'; // предполагаемый тип User

// тут описан unit тест

// мокаем зависимости нашего user service
const ConfigServiceMock: IConfigService = {
	get: jest.fn(), // удовлетворяя интерфейсу
};

const UserRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
	getUserInfo: jest.fn(),
};

const container = new Container(); // собираем контейнер

let configService: IConfigService; // берем то что есть у User Service в конструкторе
let usersRepository: IUsersRepository;
let usersService: IuserService; // берем также его интерфейс

beforeAll(() => {
	container.bind<IuserService>(TYPES.UserService).to(UserService); // добавили в контейнер userService
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock); // так мы не хотим передавать все зависимости  userService то мы используем mock
	container.bind<IUsersRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock); // toConstantValue позволяет биндить не интерфейс а константу

	configService = container.get<IConfigService>(TYPES.ConfigService); // и получаем из контейнера наши конфиги зависимостей
	usersRepository = container.get<IUsersRepository>(TYPES.UserRepository);
	usersService = container.get<IuserService>(TYPES.UserService);
});

let createdUser: UserModel | null = null;

// тест начинается с describe пишем что мы тестируем
describe('User Service', () => {
	it('createUser', async () => {
		// в этом методе есть еще метод configService.get, который нужно тоже тестить, он вернет нам '1'
		(configService.get as jest.Mock).mockReturnValueOnce('1');

		// мокаем usersRepository.create, принимает User и возвращает UserModel
		(usersRepository.create as jest.Mock).mockImplementationOnce(
			(user: User): UserModel => ({
				// тут принимаем функцию юзер и возвращаем юзер модель
				id: 1,
				name: user.name,
				email: user.email,
				password: user.password,
			}),
		);

		createdUser = await usersService.createUser({
			email: 'a@a.ru', // наша тестируемая функция принимает эти параметры
			name: 'Антон',
			password: '2',
		});

		expect(createdUser?.id).toEqual(1); // проверяем, что id 1
		expect(createdUser?.password).not.toEqual('1'); // проверяем, что пароль не стал '1'
	});

	it('validateUser - success', async () => {
		// передача пароля как у пользователя
		// передача пароля как у пользователя
		(usersRepository.find as jest.Mock).mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: 'a@a.ru', // наше dto передаем
			password: '2', // используем правильный пароль
		});
		expect(res).toBeTruthy(); // ожидаем что res должен быть true тогда ок
	});
});

it('validateUser - wrong password', async () => {
	// проверка нашего метода на то когда пароль не верен
	(usersRepository.find as jest.Mock).mockReturnValueOnce(createdUser);
	const res = await usersService.validateUser({
		email: 'a@a.ru',
		password: 'wrong', // неправильный пароль
	});
	expect(res).toBeFalsy(); // res должен быть false тогда ок
});

it('validateUser - wrong user', async () => {
	// проверка когда пользователь не найден
	(usersRepository.find as jest.Mock).mockReturnValueOnce(null);
	const res = await usersService.validateUser({
		email: 'a@a.ru',
		password: '1',
	});
	expect(res).toBeFalsy(); // res должен быть false тогда ок
});

import { IsEmail, IsString } from 'class-validator'; // данный класс позволяет нам делать сложные валидации

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({}, { message: 'Не указан пароль' })
	password: string;

	@IsString({}, { message: 'Не указано имя' })
	name: string;
}

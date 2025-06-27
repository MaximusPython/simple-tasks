import { IsEmail, IsString } from 'class-validator'; // данный класс позволяет нам делать сложные валидации

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({}, { message: 'Неверно указан пароль' })
	password: string;
}

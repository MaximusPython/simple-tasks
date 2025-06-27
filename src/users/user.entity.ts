import { compare, hash } from 'bcryptjs';

// здесь прописали бизнес логику entity это бизнес логика (данные пользователя чаще всего это связано с обьектами реального мира)
// она должна быть отделена от других частей нашей системы
export class UserEntity {
	private _password: string;
	constructor(
		// конструктор устанавливает первичные данные емейл и имя пользователя
		private readonly _email: string,
		private readonly _name: string,
		private readonly passwordHash: string,
	) {
		if (passwordHash) this._password = passwordHash;
	}
	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._email;
	}
	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		// хешериуем пароль нашего пользователя
		this._password = await hash(pass, salt);
	}
	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password); // compare сравнивает пароль и хеш
	}
}

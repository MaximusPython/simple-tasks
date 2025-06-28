import { BaseController } from '../common/base.controller.js';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../error/http-error.class.js';
import { Ilogger } from '../logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types.js';
import 'reflect-metadata';
import { UserControllerInterface } from './user.controller.interface.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { UserEntity } from './user.entity.js';
import { UserService } from './user.service.js';
import { ValidateMiddleware } from '../common/validate.middleware.js';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface.js';
import { AuthGuard } from '../common/auth.guard.js';

@injectable() // сначала extend потои implement
export class UserController extends BaseController implements UserControllerInterface {
	constructor(@inject(TYPES.Ilogger) private loggerService: Ilogger, @inject(TYPES.UserService) private userService: UserService, @inject(TYPES.ConfigServie) private configService: IConfigService) {
		// получаем из вне Ilogger, через inject его добавялем его истанс, в конструкторе, и можем его использовать в этом классе
		// cвой-во перемейновали на loggerService что бы не было пересечений с другим классом
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)] }, // middlewares: на UserRegisterDto мы должны провалидировать наши данные
			// наш контроллер прнимает допольнительно middleware
			{ path: '/login', method: 'post', func: this.login,  middlewares: [new ValidateMiddleware(UserLoginDto)]  },// middlewares: на UserLoginDto мы должны провалидировать наши данные
			{ path: '/info', method: 'get', func: this.info,  middlewares: [new AuthGuard()]  }, // добавляем наш мидлвер в наш контроллер
		]);
	}

	// в нижние методы мы добавили dto - dto это контракты между front и back
	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(req.body)
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'))
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET')) // подписание токена передавая секрет который храниться в env (используем config service)

		this.ok(res, {jwt})
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	) Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'))
		}
		this.ok(res, {email: result.email, id: result.id})
	}

	async info( // вытаскиваеи информацию из токена и возратит пользователя
		{ user }: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user)
		this.ok(res, {email: userInfo?.email, id: userInfo?.id})

		}
	

	private signJWT(email: string, secret: string): Promise<string> { // получаем наш токен
		return new Promise<string>((resolve, reject) => {
			sign({
				email, // шифруем наш email
				iat:Math.floor(Date.now() / 1000), // когда мы выпустили наш токен
			} secret, {
					algorithm: 'HS256' // cтандартный алгортим в токенах
				}, (err, token) => {
					if (err) {
						reject(err)
					}
					resolve(token as string)
				}
			)
		})
	}
}

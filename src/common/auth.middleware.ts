import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	// верификация нашего токена
    constructor(private secret: string) {}
	execute: (req: Request, res: Response, next: NextFunction): void { // получаем наши headers из req
        if (req.headers.authorization)  {
            verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => { // берем только токен берем индекс 1, через verify проверяем токен секрету 
                if (err) { // если ошибка переходим дальше
                    next()
                } else if (payload) {
                    req.user = payload.email // если есть данные то обогащаем наш req
                    next()
                }
            })
        } else {
            next()

        }
    }
}

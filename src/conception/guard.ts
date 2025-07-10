import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable() // базовый пример guard
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('guards');
    const request = context.switchToHttp().getRequest(); // получаем наш запрос
    const isAuth = request.headers.authorization === 'secret'; // из запроса берем headers и authorization и если оно равно нашему секрету то тру иначе фалс и ошибка
    // в insomnia передали в headers authorization === secret и ok
    if (!isAuth) throw new UnauthorizedException('Not authorized'); // будет возвращена 401 ошибка
    return isAuth;
  }
}

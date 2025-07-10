import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// интесепторы позволяют изменять ответы до их отправки пользователю
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before... intercept');

    return next.handle().pipe(tap(() => console.log('After... intercept')));
    // Request... middleware
    // guards
    // Before...
    // pipe
    // 2
    // After....
  }
}

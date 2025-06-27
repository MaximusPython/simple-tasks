import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import {validate} from 'class-validator'

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}


	execute: ({ body }: Request, res: Response, next: NextFunction): void {
        const instance = plainToClass(this.classToValidate, body) // преобразуем боди к классу будет его класс
        validate(instance).then(errors) => { // валидация
            if (errors.length > 0) {
                res.status(422).send(errors)
            } else {
                next()
            }
        })}}
        

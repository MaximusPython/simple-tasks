import { Int, Field, ObjectType, Float } from '@nestjs/graphql'; // описание модели
// декораторы @Int, @Field, @ObjectType и другие — это часть механизма, который позволяет создавать GraphQL-схему на основе TypeScript-классов

@ObjectType() // объявляем, что это GraphQL-тип
export class FlowerModel {
  @Field(() => Int) // Field Декоратор для свойства класса. Он указывает, что это поле должно быть включено в GraphQL-схему и какого оно типа.
  id: number; // Аргументом @Field() передаётся функция, возвращающая тип (Int, String, Boolean, Float, или кастомный класс).

  @Field()
  name: string;

  @Field()
  color: string;

  @Field(() => Float)
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

// @ObjectType	Объявляет GraphQL тип (type)
// @Field	Поле GraphQL-типа
// @Int	Явное указание типа Int (целое число)
// @Args	Аргумент запроса в @Query или @Mutation
// @Query	Запрос GraphQL
// @Mutation	Мутация GraphQL

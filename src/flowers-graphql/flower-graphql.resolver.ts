import { Query, Resolver } from '@nestjs/graphql';
import { ApiService } from 'src/api/api.service';
import { FlowerModel } from './flower.model';
//Querry параметр отвечает за получение
// Mutation за изменение, обновление и тд

@Resolver() // резолвер такой же контроллер только путь всегда /graphql
export class ApiGraphqlResolver {
  constructor(private readonly apiService: ApiService) {}

  @Query(() => [FlowerModel], { name: 'flowers' }) //@nestjs/graphql → содержит декораторы для GraphQL: @Resolver, @Query, @Mutation, @Args и т.д.
  findAll() {
    return this.apiService.findAll(); // внутри apiService берем все цветы
  }
}

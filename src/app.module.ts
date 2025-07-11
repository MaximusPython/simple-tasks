import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { LoggerMiddleware } from './conception/middleware';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceModule } from './microservice/microservice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApiGraphqlModule } from './flowers-graphql/flower-graphql.module';
import { WebsocketGateway } from './websocket.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    MicroserviceModule,
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8877,
        },
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // подключение и настройки graphql
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // путь к файлу схемы graph ql
      sortSchema: true, // сортировка схемы
    }),
    ApiGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // с помощью consumer мы используем наш middleware,
    consumer.apply(LoggerMiddleware).forRoutes('restapi/api'); // мидлвер будет использоваться когда мы будем дергать роут restapi/api
  }
}

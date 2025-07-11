import {
  // работа с вебсокетом (нужно куча пакетов)
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    // инициализация сокета
    console.log('WebsocketGateway initialized');
  }
  handleConnection(client: Socket, ...args: any[]) {
    // подключение сокета
    console.log('Client connected: ', client.id); // у каждого сокета есть свой id по которому мы сможем найти то или иное соединение
  }
  handleDisconnect(client: Socket) {
    // // отключение сокета
    console.log('Client disconnected: ', client.id);
  }

  @SubscribeMessage('message') // подписываем на message
  handleMessage(@MessageBody() message: string): void {
    // слушатель месседж
    console.log('Message', message);
    this.server.emit('message', `Echo: ${message}`);
  }
}

// проверять это нужно через postman выбрать websocket io запрос

// в postman подключаем два запрос localhost 4200 и пересылаем сообщения
// Client connected:  JgZkAG1u9BQy-gECAAAB
// Client connected:  RIQhl7MAPj2QGnk-AAAD
// Message hi body
// Message hi bro

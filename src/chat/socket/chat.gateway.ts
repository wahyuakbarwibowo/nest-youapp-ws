import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(userId);
    }
  }

  notifyUser(userId: string, message: any) {
    this.server.to(userId).emit('newMessage', message);
  }
}

import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ChatProducer {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendMessageEvent(payload: any) {
    await this.amqpConnection.publish(
      'chat-exchange',
      'chat.message.sent',
      payload,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../message.schema';
import { ChatGateway } from '../socket/chat.gateway';

@Injectable()
export class ChatConsumer {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    private chatGateway: ChatGateway,
  ) {}

  @RabbitSubscribe({
    exchange: 'chat-exchange',
    routingKey: 'chat.message.sent',
    queue: 'chat-message-queue',
  })
  async handleMessage(payload: any) {
    const message = await this.messageModel.create({
      senderId: payload.senderId,
      receiverId: payload.receiverId,
      content: payload.content,
    });

    // Real-time notification
    this.chatGateway.notifyUser(payload.receiverId, message);
  }
}

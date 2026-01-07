import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './message.schema';
import { ChatProducer } from './rabbitmq/chat.producer';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    private chatProducer: ChatProducer,
  ) {}

  async sendMessage(senderId: string, receiverId: string, content: string) {
    await this.chatProducer.sendMessageEvent({
      senderId: new Types.ObjectId(senderId),
      receiverId: new Types.ObjectId(receiverId),
      content,
    });

    return { message: 'Message sent' };
  }

  async viewMessages(userId: string, otherUserId: string) {
    return this.messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      })
      .sort({ createdAt: 1 });
  }
}

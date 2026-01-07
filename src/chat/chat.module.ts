import 'dotenv/config'
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Message, MessageSchema } from './message.schema';
import { ChatProducer } from './rabbitmq/chat.producer';
import { ChatConsumer } from './rabbitmq/chat.consumer';
import { ChatGateway } from './socket/chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RabbitMQModule.forRoot({
      uri: process.env.RABBITMQ_URI,
      exchanges: [
        {
          name: 'chat-exchange',
          type: 'topic',
        },
      ],
    }),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatProducer, ChatConsumer, ChatGateway],
})
export class ChatModule {}

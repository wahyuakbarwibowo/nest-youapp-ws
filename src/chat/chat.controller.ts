import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@ApiBearerAuth('JWT-auth')
@Controller('api')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'Send message to another user' })
  @Post('sendMessage')
  sendMessage(@Req() req, @Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(
      req.user.userId,
      dto.receiverId,
      dto.content,
    );
  }

  @ApiOperation({ summary: 'View chat messages with another user' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('viewMessages')
  viewMessages(@Req() req, @Query('userId') userId: string) {
    return this.chatService.viewMessages(req.user.userId, userId);
  }
}

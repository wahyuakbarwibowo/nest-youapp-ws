import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ example: '123' })
  @IsString()
  receiverId: string;

  @ApiProperty({ example: 'Hi' })
  @IsString()
  content: string;
}
